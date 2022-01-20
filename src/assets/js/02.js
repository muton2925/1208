
// async function reload_nssi_topology(nodes) {
//     myChart.setOption({
//       series: [
//           {
//             type: 'graph',
//             layout: 'force',
//             data: nodes,
//             edgeSymbol: ['circle', 'arrow'],
//             edgeSymbolSize: [4, 10],
//             roam: true,
//             label: {
//                 show: true,
//                 position: 'bottom',
//                 color: 'rgba(0, 0, 0, 1)',
//             },
//             lineStyle: {
//                       color: 'source',
//                   },
//             emphasis: {
//                       lineStyle: {
//                           width: 10
//                       }
//                   },
//             force: {
//                 repulsion: 100
//             }
//           }]
//     });
// }


//function delete_vnf(nodes, nssiID, NM_URL) {
//const url = NM_URL+'ObjectManagement/NSS/SliceProfiles/';
//axios.delete(url+nssiID+'/')
//.then((response) => {
//for (let i = nodes.length - 1; i >= 1; i--) {
//setTimeout(function (){
//nodes.pop();
//reload_nssi_topology(nodes);
//if (nodes.length == 1) {
//alert("NSSI Deallocate Success");
//window.location.href = '/NSS_Instance/';
//}
//}, i*1000);
//}
//})
//.catch((error) => {
//console.log(error);
//alert("NSSI in not allocated");
//window.location.href = '/NSS_Instance/';
//});
//}

