// Get data from logger microbit, relay to terminal
radio.onReceivedString(function (receivedString) {
    // String ends in comma, so add to outString
    if (receivedString.charAt(receivedString.length - 1).compare(",") == 0) {
        outString = receivedString
    } else if (receivedString.charAt(0).compare("r") == 0) {
        // This is read time data string
        serial.writeLine(receivedString.substr(1, receivedString.length - 2))
    }
})
// Expect 4 name/value pairs
radio.onReceivedValue(function (name, value) {
    // V3 is the last data message, so send it to Serial
    if (name.compare("V3") == 0) {
        outString = "" + outString + value
        serial.writeLine(outString)
        outString = ""
    } else {
        outString = "" + outString + value + ","
    }
})
// Get command from terminal, relay to logger microbit
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serialString = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    radio.sendString(serialString)
})
let serialString = ""
let outString = ""
radio.setGroup(1)
radio.setTransmitPower(7)
outString = ""
