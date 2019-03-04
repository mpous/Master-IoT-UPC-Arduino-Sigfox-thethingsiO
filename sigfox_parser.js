function main(params, callback){
  
  var temp = (parseInt(params.data, 16));
  console.log("TEMP = "+temp);
  
  var result = [
    {
        "key": "temperature",
        "value": temp
    }, {
      "key": "snr",
      "value": params.custom.snr
    }, {
      "key": "time",
      "value": params.custom.time
    }, {
      "key": "duplicate",
      "value": params.custom.duplicate
    }, {
      "key": "station",
      "value": params.custom.station
    }, {
      "key": "avgSnr",
      "value": params.custom.avgSnr
    }, {
      "key": "rssi",
      "value": params.custom.rssi
    },{
      "key": "seqNumber",
      "value": params.custom.seqNumber
    },{
      "key": "lastAccess",
      "value": moment().isDST() ? moment().add(1, 'hour').toISOString() : moment().add(2, 'hour').toISOString()
    }];
    callback(null, result); 
  
}
