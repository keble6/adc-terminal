// Get data from logger microbit, relay to terminal
radio.onReceivedString(function (receivedString) {
    // Send only completed messages (i.e. does not end in comma)
    if (receivedString.charAt(receivedString.length - 1).compare(",") == 0) {
        outString = "" + outString + receivedString
    } else {
        outString = "" + outString + receivedString
        serial.writeLine(outString)
        outString = ""
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
