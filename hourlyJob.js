
function job(params, callback){
    async.waterfall([
      thethingsAPI.getProductThings,
      getAvgMaxMin,
      getStatus
    ], function(err, results){
       if(err) return callback(err);
       callback(null, "Done!");
    });
}

function getAvgMaxMin(things, callback){
    var startDay = moment().startOf('hour').subtract(1, 'hours');
    var endDay = moment().endOf('hour').subtract(1, 'hours');
    var options = {
      lib: 'panel',
      startDate: startDay.toJSON(),
      endDate: endDay.toJSON(),
      limit: 1000
    };

    async.eachLimit(things, 10, (thing, next) => {
        thethingsAPI.thingRead(thing.thingToken, 'temperature', options, (err, result) => {
            if(err || result.length === 0) return next();

            let maxTemp = 0;
            let minTemp = 100;
            let avgTemp = 0;

            for(let i=1; i<result.length; i++){
                avgTemp += parseFloat(result[i].value);
                if(result[i].value > maxTemp) maxTemp = parseFloat(result[i].value);
                if(result[i].value < minTemp) minTemp = parseFloat(result[i].value);
            }
            avgTemp = parseFloat((avgTemp / result.length).toFixed(1));

            let values = {values:[
                {key: 'maxTemp', value: maxTemp},
                {key: 'minTemp', value: minTemp},
                {key: 'avgTemp', value: avgTemp}
            ]};

            thethingsAPI.thingWrite(thing.thingToken, values, function(err, res) {
                next();
            });
        });
    }, function(err){
        if(err) return callback(err);
        callback(null, things);
    });
}

function getStatus(things, callback){
    async.eachLimit(things, 10, (thing, next) => {
      thethingsAPI.thingRead(thing.thingToken, 'temperature', {lib: 'panel'}, (err, result) => {
        if(err || result.length === 0) return next();

        let momentLastMsg = result[0].datetime;
        let timeSinceLastMsg = moment().diff(momentLastMsg, 'hours');
        
        let values = {values:[
            {key: 'connectionStatus', value: ((timeSinceLastMsg > 6) ? "offline":"online")},
            {key: 'hoursOffline', value: timeSinceLastMsg}
        ]};
   
        thethingsAPI.thingWrite(thing.thingToken, values, function(err, res) {
          next();
        });

      });
    }, function(err){
      if(err) return callback(err);
      callback(null, things);
    });
}
