radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serialString = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    radio.sendString(serialString)
})
let serialString = ""
radio.setGroup(1)
