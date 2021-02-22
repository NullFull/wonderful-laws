import Ajv from 'ajv'
import firebase from 'firebase-admin'
import { getDB } from 'utils/db'
import { response, error } from 'utils/api'


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

    const db = getDB()
    const collection = db.collection('signs')
    await collection.add({
        ip, ua,
        name, contact, address, comment,
        private: priv,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    })

    res.status(201)
    response(res, {
        private: priv,
        comment,
    })
}

async function messages (req, res) {
    const db = getDB()
    const collection = db.collection('signs')
    // TODO : query concurrent
    const stats = await collection.doc('__stats').get()
    const messages = await collection
        .where('private', '==', false)
        .orderBy('created', 'desc')
        .limit(30)
        .get()

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
