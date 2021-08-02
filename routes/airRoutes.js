const mongoose = require('mongoose')
const Air = mongoose.model('airs')

const axdata = require( '../utils/axdata' )

module.exports = app => {
    app.post( '/airdata/update', async ( req, res ) => {
        try {
            // req.body.location
            await axdata( req.body.location, ( error, { airquality } = {} ) => {
                if ( error ) {
                    console.log('error', error)
                    return res.send( error )
                }
                console.log('airquality time + location', airquality.time, airquality.location)
                Air.findOne( { time: airquality.time, location:airquality.location }, ( err, doc ) => {
                    const air = new Air( {
                        location, time, pm10, pm25, no2
                    } = airquality  )
                    if ( doc ) {
                        console.log("Duplcate exists")
                        res.status(302).send( "Duplicate document exists" )
                    } else {
                        air.save()
                        res.send('Air quality data are saved.')
                    }
                } )
            } )
        } catch ( e ) {
            res.status( 400 ).send( e )
        }
    })
    
    app.get('/airdata/display', async (req, res) => {
        try {
            const airdata = await Air.find({})
            res.send(airdata)
        } catch (e) {
            res.status(500).send()
        }
    })

    app.get('/airdata/Date/:date', async (req, res) => {
        const measureDate = req.params.date
        try {
            const air = await Air.find({time:{$regex:measureDate}})
            if (!air) {
                return res.status(404).send()
            }
            res.send(air)
        } catch (e) {
            res.status(500).send()
        }
    } )

    app.get('/airdata/Time/:time', async (req, res) => {
        const measureTime = req.params.time
        try {
            const air = await Air.find( { time: measureTime })
            if (!air) {
                return res.status(404).send()
            }
            res.send(air)
        } catch (e) {
            res.status(500).send()
        }
    } )

    app.delete('/airdata/:time', async (req, res) => {
        try {
            const air = await Air.findByIdAndDelete(req.params.time)

            if (!air) {
                res.status(404).send()
            }

            res.send(air)
        } catch (e) {
            res.status(500).send()
        }
    })
}