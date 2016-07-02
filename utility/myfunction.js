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
		   			pnaccnetproctime:row.pnaccnetproctime,
		   			pnbuffertime:row.pnbuffertime,
		   			pnaccbuffertime:row.pnaccbuffertime,
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
                    nodelist.forEach(function(item){if(item.nodecode===headnodecode){curnode = item;return;}});
                    firstnode = curnode;
                    // Headers
                    var i=0;
                    while(curnode && i<100)//prevent dead loop
                    {
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
			                    ren.label('累计：'+curnode.pnaccnetproctime+'+'+curnode.pnaccbuffertime, 75+160*(i%colnum), 75+parseInt(i/colnum)*100)
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