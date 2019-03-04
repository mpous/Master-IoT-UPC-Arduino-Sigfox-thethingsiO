
function main(params, callback){
  
  var temp = (parseInt(params.payload.data, 16));
  console.log("TEMP = "+temp);
  
  var result = [
    {
        "key": "temperature",
        "value": temp
    }, {
      "key": "snr",
      "value": params.payload.snr
    }, {
      "key": "time",
      "value": params.payload.time
    }, {
      "key": "duplicate",
      "value": params.payload.duplicate
    }, {
      "key": "station",
      "value": params.payload.station
    }, {
      "key": "avgSnr",
      "value": params.payload.avgSnr
    }, {
      "key": "rssi",
      "value": params.payload.rssi
    },{
      "key": "seqNumber",
      "value": params.payload.seqNumber
    },{
      "key": "lastAccess",
      "value": moment().isDST() ? moment().add(1, 'hour').toISOString() : moment().add(2, 'hour').toISOString()
    }
    ];

    callback(null, result); 
  
}
