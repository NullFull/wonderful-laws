import Ajv from 'ajv'
import firebase from 'firebase-admin'
import { getDB } from 'utils/db'
import { response, error, cache } from 'utils/api'


const schema = {
    properties: {
        name: { type: 'string', minLength: 1, maxLength: 50 },
        contact: { type: 'string', minLength: 1, maxLength: 50 },
        address: { type: 'string', minLength: 1, maxLength: 100 },
        comment: { type: 'string', minLength: 1, maxLength: 5000 },
        private: { type: 'boolean' },
    },
    required: ['name', 'contact', 'address', 'comment']
}

const validate = new Ajv().compile(schema)


async function sign (req, res) {
    if (!validate(req.body)) {
        return error(res, 400, {})
    }

    const { name, contact, address, private: priv = true, comment } = req.body
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress
    const ua = req.headers['user-agent']
    const incr = firebase.firestore.FieldValue.increment(1)

    // TODO : query concurrent
    const db = getDB()
    const collection = db.collection('signs')
    await collection.add({
        ip, ua,
        name, contact, address, comment,
        private: priv,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    })

    const stats = await collection.doc('__stats')
    await stats.update({
        'count': incr,
    }, {
        merge: true,
    })

    res.status(201)
    response(res, {
        private: priv,
        comment,
    })
}

async function messages (req, res) {
    const { page, pageSize } = req.query

    const db = getDB()
    const collection = db.collection('signs')
    // TODO : query concurrent
    const stats = await collection.doc('__stats').get()

    const messages = parseInt(pageSize) > 1000 
    ? await collection
    .where('private', '==', false)
    .orderBy('created', 'desc')
    .limit(1000)
    .offset((parseInt(page) - 1) * 1000)
    .get()
    : await collection
    .where('private', '==', false)
    .orderBy('created', 'desc')
    .limit(parseInt(pageSize))
    .offset((parseInt(page) - 1) * parseInt(pageSize))
    .get()


    cache(res)
    response(res, {
        count: stats.data().count,
        items: messages.docs.map(message => {
            const { comment, created } = message.data()
            return {
                id: message.id,
                comment,
                created: created.toDate(),
            }
        })
    })
}


export default async function (req, res) {
    if (req.method === 'GET') return messages(req, res)
    if (req.method === 'POST') return sign(req, res)
}
