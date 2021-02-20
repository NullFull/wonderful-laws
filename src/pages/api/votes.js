import firebase from 'firebase-admin'
import { getDB } from 'utils/db'
import { response } from 'utils/api'


async function vote (req, res) {
    const { value } = req.body
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress
    const ua = req.headers['user-agent']
    const incr = firebase.firestore.FieldValue.increment(1)

    const db = getDB()
    const collection = db.collection('votes')
    collection.add({
        value,
        ip,
        ua,
    })

    const stats = collection.doc('__stats')
    stats.update({
        [value]: incr,
    }, {
        merge: true,
    })

    res.status(201)
    response(res, {
        value,
    })
}

async function stats (req, res) {
    const db = getDB()
    const collection = db.collection('votes')
    const doc = await collection.doc('__stats').get()
    const stats = doc.data()

    response(res, stats)
}


export default async function (req, res) {
    if (req.method === 'GET') return stats(req, res)
    if (req.method === 'POST') return vote(req, res)
}
