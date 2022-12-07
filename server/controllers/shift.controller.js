const Shift = require("../models/Shift.model")
const { validationResult } = require("express-validator")

exports.add = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const shiftsArr = req.body.shifts
    Object.keys(shiftsArr).forEach(shift => {
        // hardcoded ://
        switch (shiftsArr[shift].title) {
            case "Day-Shift":
                shiftsArr[shift].title = "dayShift"
                break
            case "Night-Shift":
                shiftsArr[shift].title = "nightShift"
                break
            case "Booked":
                shiftsArr[shift].title = "booked"
                break
            case "Leave":
                shiftsArr[shift].title = "leave"
                break
            default:
                return res.status(400).json(
                    { 
                        errors: `Was expecting 'Day-Shift', 'Night-Shift', 'Booked', 'Leave', but got ${shiftsArr[shift].title}!`
                    })
        }
        shiftsArr[shift] = {
            type: shiftsArr[shift].title,
            date: shiftsArr[shift].date
        }
    })
    Shift.add(req.body, req.headers["authorization"].split(" ")[1])
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}

exports.get = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    Shift.get(req.body, req.headers["authorization"].split(" ")[1])
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
}