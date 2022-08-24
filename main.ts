radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serialString = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    radio.sendValue(serialString.substr(0, 2), parseFloat(serialString.substr(2, serialString.length)))
})
let serialString = ""
radio.setGroup(1)
