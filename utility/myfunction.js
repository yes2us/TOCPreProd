function addDate(date,days){ 
	var d=new Date(date); 
	d.setDate(d.getDate()+days); 
	return d;
}

function drawResLoad(chartdiv,loadData,chartName)
{
	    var notStartNodeData = null, inProcessNodeData=null;
	    var totalNotStartNodeCount = 0,totalInProcessNodeCount=0;
	    
	    loadData.forEach(function(item){
	    	    if(item.nodestate===Enum.NotStart)  
	    	    {
	    	    		notStartNodeData = item;
	    	    		totalNotStartNodeCount += parseInt(item.ordercount);
	    	    }
	    	    if(item.nodestate===Enum.InProcess)  
	    	    {
	    	    		inProcessNodeData = item;
	    	    		totalInProcessNodeCount += parseInt(item.ordercount);
	    	    }
	    });
	    
	
				var chartOption = {};
		   		chartOption.title={ text: chartName,style: {color: '#FF0000',fontWeight: 'bold'}};
		   		chartOption.chart={
		   			renderTo:chartdiv,
		   			backgroundColor:'#353535',
		   			margin: [-30,-30, 100, 50]
		   		};

		   		chartOption.xAxis={
            					categories: ['未启动', '进行中'],
            					crosshair: {
				                width: 1,
				                color: '#808080',
				                dashStyle: 'shortdot',
				                zIndex:10
				            }
            				};
            				
            		chartOption.plotOptions={
            			    column: {
				                stacking: 'normal',
				                dataLabels: {
				                    enabled: true,
				                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
				                }
				            },
			            series: {
			                marker: {
			                    enabled: true,
			                    radius: 4
			                }
			            }
			       };
			        
            		chartOption.yAxis={
		            gridLineColor: '#197F07',
		            gridLineWidth: 0,
		            title: {
		                text: ''
		            }
		        };
            		chartOption.credits={
            					enabled: false
       					};
				chartOption.series=[
			         {
			            type: 'column',
			            color:'#000000',
			            name: '黑单',
			            data: [(notStartNodeData? parseInt(notStartNodeData.blackcount):0), 
			            (inProcessNodeData? parseInt(inProcessNodeData.blackcount):0)]
			        },
			         {
			             type: 'column',
			            color:'#FF0000',
			            name: '红单',
			            data: [(notStartNodeData? parseInt(notStartNodeData.redcount):0), 
			            (inProcessNodeData? parseInt(inProcessNodeData.redcount):0)]
			        },
			        {
			            type: 'column',
			            color:'#FFFF00',
			            name: '黄单',
			            data: [(notStartNodeData? parseInt(notStartNodeData.yellowcount):0), 
			            (inProcessNodeData? parseInt(inProcessNodeData.yellowcount):0)]
			        }, 
			        {
			            type: 'column',
			            color:'#00FF00',
			            name: '绿单',
			            data: [(notStartNodeData? parseInt(notStartNodeData.greencount):0), 
			            (inProcessNodeData? parseInt(inProcessNodeData.greencount):0)]
			        }, 
			        {
			            type: 'column',
			            color:'#0000FF',
			            name: '蓝单',
			            data: [(notStartNodeData? parseInt(notStartNodeData.bluecount):0), 
			            (inProcessNodeData? parseInt(inProcessNodeData.bluecount):0)]
			        }, 
			         {
			            type: 'line',
			            color:'#FFFFFF',
			            name: '总订单数',
			            data: [totalNotStartNodeCount, totalInProcessNodeCount]
			        }
			        ];
		   		
		   		var chart = new Highcharts.Chart(chartOption);
}


function drawFeverChart(chartdiv,projObj)
{
				var chartOption = {};
		   		chartOption.title={ text: '项目压力图',style: {color: '#FF0000',fontWeight: 'bold'}};

		   				
		   		chartOption.chart={
		   			renderTo:chartdiv,
		   			backgroundColor:'#353535',
		   			margin: [-30,-30, 180, -30]
		   		};
		   		chartOption.xAxis={
            					categories: ['完成审核', '完成投单', '完成投料', '完成裁剪', '完成绣花','完成前道','完成后道','完成入库'],
            					crosshair: {
				                width: 1,
				                color: '#808080',
				                dashStyle: 'shortdot',
				                zIndex:10
				            }
            				};
            				
            		chartOption.plotOptions={
			            series: {
			                marker: {
			                    enabled: false,
			                    radius: 4
			                }
			            }
			       };
			        
            		chartOption.yAxis={
            			max:11,
		            gridLineColor: '#197F07',
		            gridLineWidth: 0,
		            title: {
		                text: ''
		            }
		        };
            		chartOption.credits={
            					enabled: false
       					};
				chartOption.series=[
			         {
			            type: 'area',
			            color:'#0000FF',
			            name: '蓝区',
			            data: [12, 12, 12, 12, 12,12,12,12]
			        },
			         {
			             type: 'area',
			            color:'#00FF00',
			            name: '绿区',
			            data: [6, 7, 8, 9, 10,10,10,10]
			        },
			        {
			            type: 'area',
			            color:'#FFFF00',
			            name: '黄区',
			            data: [4, 5, 6, 7, 8,9,10,10]
			        }, 
			        {
			            type: 'area',
			            color:'#FF0000',
			            name: '红区',
			            data: [0, 0, 2, 3, 4,5,6,7]
			        }, 
			        {
			            type: 'area',
			            color:'#000000',
			            name: '黑区',
			            data: [-2, -2, -1, 0, 1,2,3,4]
			        },
			        {
			            type: 'area',
			            color:'#000000',
			            name: '黑区',
			            data: [-4, -4, -4, -4, -4, -4, -4, -4,]
			        }, 
			         {
			            type: 'line',
			            color:'#FFFFFF',
			            name: '消耗缓冲',
			            data: [2, -1, 4, 3, 7]
			        }
			        ];
        
        var chart = new Highcharts.Chart(chartOption);
}
function drawProjectNode(chartdiv,projObj,colnum)
{
				var projinfo = projObj.projinfo;
				var nodelist = projObj.nodelist;
				
				var NodeGapW=180;
				var NodeGapH=200;
				var ArrawOffSetW =125;
				var ArrawOffSetH=110;
				
				var chartOption = {};
		   		
		   		chartOption.title={ 
		   				text: '项目路径-'+projinfo.projectcode+'-'+projinfo.taskobjectcode+'-'+projinfo.skccode+'-'+projinfo.ordertype,
		   				style: {
		                		color: '#FF0000',
		                		fontWeight: 'bold'}
		   				};
		   		chartOption.chart={renderTo:chartdiv,backgroundColor:'#353535'};
		   		chartOption.chart.events = {};

				chartOption.chart.events.load=function () {     
                    // Draw the flow chart
                    var ren = this.renderer;
                    var colors = Highcharts.getOptions().colors;
                    var rightArrow = ['M', 0, 0, 'L', 80, 0, 'L', 75, 5, 'M', 80, 0, 'L', 75, -5];
                    var leftArrow = ['M', 80, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];
                    var downArrow = ['M', 0, 0, 'L', 0, 75, 'L', -5, 70, 'M', 0, 75, 'L', 5, 70];
                    var up2downArrow=['M', colnum*NodeGapW-160, 5,
                    			'L', colnum*NodeGapW-160, 20,
                    			'C', colnum*NodeGapW-160, 20, colnum*NodeGapW-160, 30, colnum*NodeGapW-180, 30,
                              'L', 60, 30,
                    			 'C',40, 30, 30, 30, 30, 40,
                              'L', 30, 60,'L',25,55,'M',30,60,'L',35,55];
 
                    var firstnode = null;
                    var curnode = null;
                    var _curnode = null;

                    nodelist.forEach(function(item){if(item.nodecode===projinfo.headnodecode){curnode = item;return;}});
                    firstnode = curnode;
                    // Headers
                    var i=0;
                    while(curnode && i<100)//prevent dead loop
                    {                 	   
                    	   //draw current node
                    	   var nodeinfo = "<span>nbs</span>"+curnode.nodename
                    	   +"<br>------------</br>"
                    	   +"<br>压力开工:"+(curnode.nodetenseplanstartdate==='0000-00-00'? 'N/N':new Date(curnode.nodetenseplanstartdate).toString('M/d'))+"</br>"
                    	   +"<br>压力完工:"+(curnode.nodetenseplanfinishdate==='0000-00-00'? 'N/N':new Date(curnode.nodetenseplanfinishdate).toString('M/d'))+"</br>"
                    	   +"<br>------------</br>"
                    	   +"<br>计划完成:"+(curnode.nodeuserplanfinishdate==='0000-00-00'? 'N/N':new Date(curnode.nodeuserplanfinishdate).toString('M/d'))+"</br>"
                    	   +"<br>------------</br>"
                    	   
                    	   +"<br>实际开工:"+(curnode.nodeuseracturalstartdate==='0000-00-00'? 'N/N':new Date(curnode.nodeuseracturalstartdate).toString('M/d'))+"</br>"
                    	   +"<br>实际完工:"+(curnode.nodeuseracturalfinishdate==='0000-00-00'? 'N/N':new Date(curnode.nodeuseracturalfinishdate).toString('M/d'))+"</br>";
                    	   ren.label(nodeinfo, 30+NodeGapW*(i%colnum), 52+parseInt(i/colnum)*NodeGapH)
                        .attr({
                            fill: colors[0],
                            stroke: 'white',
                            'stroke-width': 2,
                            padding: 5,
                            r: 5
                        })
                        .css({color: 'white'})
                        .add()
                        .shadow(true);
                    	   
                    	                       	   
                    	   //draw circle
                    	   ren.circle(45+NodeGapW*(i%colnum),65+parseInt(i/colnum)*NodeGapH, 12).attr({
					        fill: (curnode.nodestate==='NotStart'? '#808080':(curnode.nodestate==='InProcess'? '#FF0000':'#00FF00')),
//					        stroke: 'black',
					        'stroke-width': 1
					    }).add();
					    
                    	   //if the current node is not the first node,draw a  arrow
                    	   if(curnode.nextnodecode)
                    	   {
                    	   	   if((i+1)%colnum)
                    	   	   {
		                    	    ren.path(rightArrow)
		                         .attr({
		                             'stroke-width': 2,
		                             stroke: '#85BF3B'
		                         })
		                        .translate(ArrawOffSetW+NodeGapW*(i%colnum), ArrawOffSetH+parseInt(i/colnum)*NodeGapH)
		                        .add();
		                        
		                        //write info above arraw
			                    ren.label('节点：'+curnode.netproctime+'+'+curnode.buffertime, ArrawOffSetW+10+NodeGapW*(i%colnum), ArrawOffSetH-20+parseInt(i/colnum)*NodeGapH)
		                        .css({fontSize: '10px',color: '#85BF3B'})
		                        .add();
		                        
		                        //write info below arraw
			                    ren.label('累计：'+curnode.accnetproctime+'+'+curnode.accbuffertime, ArrawOffSetW+10+NodeGapW*(i%colnum), ArrawOffSetH+parseInt(i/colnum)*NodeGapH)
		                        .css({fontSize: '10px',color: '#85BF3B'})
		                        .add();
		                        
	                        }
                    	   }
                    	   
                    	    // draw up2down arrow
                    	    if(parseInt(i/colnum))
                    		ren.path(up2downArrow)
                         .attr({
                             'stroke-width': 2,
                             stroke: '#85BF3B'
                         })
                         .translate(45, parseInt(i/colnum)*NodeGapH-10)
                         .add();
                    	   
                    	    //draw nodeleadername
                    	   ren.label(curnode.nodeleadername,50+NodeGapW*(i%colnum),30+parseInt(i/colnum)*NodeGapH)
                    	   .css({fontWeight: 'bold',color: 'white'})
                    	   .add();
                    	   
                    	   //find the next node
                    	   _curnode = null;
                    	   nodelist.forEach(function(item){if(item.nodecode===curnode.nextnodecode){_curnode = item;return;}});
                   	  curnode =_curnode;
                   	   i++;
                    }
            
                     
                }
            
            var chart = new Highcharts.Chart(chartOption);

}

function drawPath(chartdiv,dtpath,dtpathnode,colnum){

   	        var headnodecode=$$(dtpath).getSelectedItem().headnodecode;

   		    if(!headnodecode || headnodecode=='null') return;
   		    
		   	var nodelist = []
		   	$$(dtpathnode).eachRow(function(rowid){
		   		var row=$$(dtpathnode).getItem(rowid);
		   		nodelist.push({
		   			nodecode:row.nodecode,
		   			nodename:row.nodename,
		   			pnnextnodecode:row.pnnextnodecode,
		   			pnnetproctime:row.pnnetproctime,
		   			pnbuffertime:row.pnbuffertime,
		   			
//		   			pnaccnetproctime:row.pnaccnetproctime,
//		   			pnaccbuffertime:row.pnaccbuffertime,
		   			pnnodeleadername:row.pnnodeleadername
		   		});
		   	});
		
		   		var chartOption = {};
		   		
		   		chartOption.title={ 
		   				text: '路径图-'+$$(dtpath).getSelectedItem().pathname,
		   				style: {
		                		color: '#FF0000',
		                		fontWeight: 'bold'}
		   				};
		   		chartOption.chart={renderTo:chartdiv,backgroundColor:'#353535'};
		   		chartOption.chart.events = {};
		   		
				chartOption.chart.events.load=function () {
                    
                    // Draw the flow chart
                    var ren = this.renderer;
                    var colors = Highcharts.getOptions().colors;
                    var rightArrow = ['M', 0, 0, 'L', 80, 0, 'L', 75, 5, 'M', 80, 0, 'L', 75, -5];
                    var leftArrow = ['M', 80, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];
                    var downArrow = ['M', 0, 0, 'L', 0, 75, 'L', -5, 70, 'M', 0, 75, 'L', 5, 70];
                    var up2downArrow=['M', colnum*160-120, 10,
                    			'L', colnum*160-120, 20,
                    			'C', colnum*160-120, 20, colnum*160-120, 40, colnum*160-140, 40,
                              'L', 60, 40,
                    			 'C',60, 40, 40, 40, 40, 60,
                              'L', 40, 80,'L',35,75,'M',40,80,'L',45,75];
 
                    var firstnode = null;
                    var curnode = null;
                    var _curnode = null;
                    var pnaccnetproctime=0,pnaccbuffertime=0;
                    nodelist.forEach(function(item){if(item.nodecode===headnodecode){curnode = item;return;}});
                    firstnode = curnode;
                    // Headers
                    var i=0;
                    while(curnode && i<100)//prevent dead loop
                    {
                    		pnaccnetproctime += parseInt(curnode.pnnetproctime);
                    		pnaccbuffertime += parseInt(curnode.pnbuffertime);
                    	  //draw nodeleadername
                    	   ren.label(curnode.pnnodeleadername,20+160*(i%colnum),30+parseInt(i/colnum)*160)
                    	   .css({fontWeight: 'bold',color: 'white'})
                    	   .add();
                    	   
                    	   
                    	   //draw current node
                    	   ren.label(curnode.nodename, 10+160*(i%colnum), 62+parseInt(i/colnum)*100)
                        .attr({
                            fill: colors[0],
                            stroke: 'white',
                            'stroke-width': 2,
                            padding: 5,
                            r: 5
                        })
                        .css({color: 'white'})
                        .add()
                        .shadow(true);
                    	   
                    	   //if the current node is not the first node,draw a  arrow
                    	   if(curnode.pnnextnodecode && curnode.pnnextnodecode != 'null' &&  curnode.pnnextnodecode.length>0)
                    	   {
                    	   	   if((i+1)%colnum)
                    	   	   {
		                    	    ren.path(rightArrow)
		                         .attr({
		                             'stroke-width': 2,
		                             stroke: '#85BF3B'
		                         })
		                        .translate(75+160*(i%colnum), 75+parseInt(i/colnum)*100)
		                        .add();
		                        
		                        //write info above arraw
			                    ren.label('节点：'+curnode.pnnetproctime+'+'+curnode.pnbuffertime, 75+160*(i%colnum), 55+parseInt(i/colnum)*100)
		                        .css({fontSize: '10px',color: '#85BF3B'})
		                        .add();
		                        
		                        //write info below arraw
			                    ren.label('累计：'+pnaccnetproctime+'+'+pnaccbuffertime, 75+160*(i%colnum), 75+parseInt(i/colnum)*100)
		                        .css({fontSize: '10px',color: '#85BF3B'})
		                        .add();
	                        }
                    	   }
                    	   
                    	    // draw up2down arrow
                    	    if(parseInt(i/colnum))
                    		ren.path(up2downArrow)
                         .attr({
                             'stroke-width': 2,
                             stroke: '#85BF3B'
                         })
                         .translate(0, parseInt(i/colnum)*100-20)
                         .add();
                    	   
                    	   //find the next node
                    	   _curnode = null;
                    	   nodelist.forEach(function(item){if(item.nodecode===curnode.pnnextnodecode){_curnode = item;return;}});
                   	   curnode =_curnode;
                   	   i++;
                    }
            
                     
                }
            
            var chart = new Highcharts.Chart(chartOption);
        }