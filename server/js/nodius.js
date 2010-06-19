//global namespace
var NODIUS = {};

NODIUS.Engine = function() {
    return{
        drawChart:function(){
            var self = this;

            NODIUS.Core.AJAXGetJSON('/buffer/get/?name=local.localhost.network.pingRemoteHost', function(data){
                var output = []
                data.values.each(function(val){
                    output.push(val.value.avg);    

                });

                self.pingChart.options.chartData = output;
                self.pingChart.resetAndRedraw();

            });

             NODIUS.Core.AJAXGetJSON('/buffer/get/?name=local.localhost.system.getTCPConnections', function(data){
                var output = []
                data.values.each(function(val){
                    output.push(val.value);

                });

                self.tcpChart.options.chartData = output;
                self.tcpChart.resetAndRedraw();

            });
        },

        run : function(){
            var self = this;
            var timeoutFunc = function () {
                self.run();
            };
            this.timeout = setTimeout(timeoutFunc, 1000);
            this.drawChart();
        },

        init:function(){
            this.pingChart = new ChartEngine({
                'canvasID':'c1',
                'tooltip':'tt',
                'type':'line',
                'color':'#acacff',
                'lineWidth':1,
                'xTitle':'time',
                'yTitle':'resonse (ms)'
            });

            this.tcpChart = new ChartEngine({
                'canvasID':'c2',
                'tooltip':'tt',
                'type':'line',
                'color':'#acacff',
                'lineWidth':1,
                'xTitle':'time',
                'yTitle':'# conections'
            });
            
        }
    }
}();


NODIUS.Core = function() {

    return{
        observers:[],

        //get JSON data
        AJAXGetJSON:function(url, callback) {
            new Ajax.Request(url, {
                method: 'get',
                onSuccess: function(transport) {
                    var data = transport.responseJSON;
                    callback(data);
                }
            });
        },

        // get data by AJAX call and return as plain text
        AJAXGet:function(url, callback) {
            new Ajax.Request(url, {
                method: 'get',
                onSuccess: function(transport) {
                    var data = transport.responseText;
                    callback(data);
                }
            });
        },
        //post data to url as postBody
        AJAXPostBody:function(url, data, callback) {
            new Ajax.Request(url, {
                method: 'post',
                postBody: data,
                onSuccess: function(transport) {
                    var data = transport.responseText;
                    callback(data);
                }
            });
        }
    }
}();