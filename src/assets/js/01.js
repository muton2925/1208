import axios from 'axios'
import * as echarts from 'echarts'
import {  ref } from 'vue';
var label;
var datas,nssi_num; 
let NSViewChartContent = ref()
function show_nssi(dom,unmount) {
    var myChart;
    function myChartResize (){
       myChart.resize();
    }
   if (unmount){
    window.removeEventListener('resize',myChartResize)
   }
   else {
      myChart = echarts.init(dom)
      window.addEventListener('resize',myChartResize)
      return myChart
   } 
}

function nssiContent(myChart,url){
    
  axios.get(url).then(response => {
      
      if (response.data.length) {
        for (var i = 1; i < response.data.length; i++) {
          var node_tal = response.data[0].nodes;
          var node = response.data[i].nodes;
          node_tal = node_tal.concat(node);
          // $.merge(node_tal, node);
          var link_tal = response.data[0].links;
          var link = response.data[i].links;
          link_tal = link_tal.concat(link);
          // $.merge(link_tal, link);
        }
        datas = response.data[0];
        nssi_num = response.data.length;
      }else{
        nssi_num = 1;
        datas = response.data;
      }

      var categories = [];
      datas.nodes.forEach(function(node) {
        node.itemStyle = null;
        node.category = node.attributes.modularity_class;
        node.value = node.category;
        // Use random x,y
        node.x = node.y = null;
        node.draggable = true;
      });

      categories[0] = {
        name: 'NSSI'
      };
      categories[1] = {
        name: "VNF",
        itemStyle: {
          color: "rgb(55, 206, 13)"
        }
      };

      label = false;
      myChart.setOption({
        tooltip: {},
        legend: [{
          data: categories.map(function (a) {
            return a.name;
          }),
          selected: {
            'NSI': false,
            'VNF': false
          }
        }],
        animation: false,
        series: [
            {
              type: 'graph',
              layout: 'force',
              data: datas.nodes,
              links: datas.links,
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [5, 10],
              categories: categories,
              roam: true,
              label: {
                  show: true,
                  position: 'bottom',
                  color: 'rgba(0, 0, 0, 1)',
              },
              lineStyle: {
                        color: 'source',
                    },
              emphasis: {
                        lineStyle: {
                            width: 10
                        }
                    },
              force: {
                  repulsion: 100
              }
            }]
        });
      if (!response.data.length) {
        myChart.setOption({
          legend: [{
            selected: {
              'NSI': true,
              'VNF': true
            }
          }]
        });
      }
      NSViewChartContent.value=[`Total NSSI: ${nssi_num}`]
    });
    
}

function myChartDbclick(myChart){
    myChart.on('dblclick', function () {
      NSViewChartContent.value=[`Total NSSI: ${nssi_num}`]
  });
}
function myChartClick(myChart,topology_url){
  var nssi_switched = 0;  
  console.log(topology_url)
  myChart.on('click', {dataType: 'node'}, function (params) {
    switch(params.data.attributes.modularity_class){
      case 1:
        NSViewChartContent.value = [
          `VNF id: ${params.data.id}`,
          `VNF name: ${params.name}`,
          `Address: ${params.data.address}`,
          `VNF State: ${params.data.vnfState}`,
          `Instantiation: ${params.data.instantiationState}`
        ]
        break;
      case 0:
        NSViewChartContent.value = [`NSSI id: ${params.data.id}`,`NSSI name: ${params.name}`]
        nssi_switched = !nssi_switched;
        label = !label;
        if (nssi_switched) {
          // axios.get(topology_url+params.data.id+'/').then(response => {
          //   var datas = response.data;
          //   // var categories = [];
          //   datas.nodes.forEach(function(node) {
          //     node.itemStyle = null;
          //     node.category = node.attributes.modularity_class;
          //     node.value = node.category;
          //     // Use random x,y
          //     node.x = node.y = null;
          //     node.draggable = true;
          //   });
          //   myChart.setOption({
          //     legend: [{
          //       selected: {
          //         'NSI': label,
          //         'VNF': label
          //       }
          //     }],
          //     series: [{
          //       data: datas.nodes,
          //       links: datas.links
          //     }]
          //   });
          // });
          NSViewChartContent.value = [`NSSI id: ${params.data.id}`,`NSSI name: ${params.name}`]
        }else{
          myChart.setOption({
            legend: [{
              selected: {
                'NSI': label,
                'VNF': label
              }
            }],
            series: [{
              data: datas.nodes,
              links: datas.links
            }]
          });
          NSViewChartContent.value=[`Total NSSI: ${nssi_num}`]
        }
        break;
    }
});
}
export {show_nssi,nssiContent,myChartDbclick,myChartClick,NSViewChartContent}