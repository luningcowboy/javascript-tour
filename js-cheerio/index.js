var http = require('https');
var cheerio = require('cheerio');

var url = 'https://www.d1xz.net/sm/bazi.aspx?d=2012%E5%B9%B4%E4%B8%89%E6%9C%88%E5%88%9D%E4%B8%80%E4%B8%911-2%E6%97%B6&n=39';


http.get(url, function(res){
    var html = '';
    res.on('data', function(data){
        html += data;
    });
    res.on('end', function(){
        filterHtml(html);
    });
}).on('error',function(){
    console.log('获取数据错误');
});

function filterHtml(html){
    if(html){
        var $ = cheerio.load(html);
        var list = $('body');
        //console.log(list['0'].children);
        let children = list['0'].children;
        for(let i = 0; i < children.length; i++){
            let child = children[i];
            if(child.name === 'div' && child.attribs.class === 'main clearfix w960'){
                console.log(child.attribs.class);
                for(let j = 0; j < child.children.length; j++){
                    let cc = child.children[j];
                    if(cc.attribs.class === 'main_left fl'){
                        console.log(cc.attribs.class);
                        for(let k = 0; k < cc.children.length; k++){
                            let ccc = cc.children[k];
                            if(ccc.attribs.class === 'art_con_left'){
                                console.log(ccc.attribs.class);
                                for(let x = 0; x < ccc.children.length; x++){
                                    let cccc = ccc.children[x];
                                    if(cccc.attribs.class === 'zxsm_p'){
                                        console.log(cccc.attribs.class);
                                        for(let y = 0; y < cccc.children.length; y++){
                                            let c5 = cccc.children[y];
                                            for(let ii = 0; ii < c5.children.length; ii++){
                                                let c6 = c5.children[ii];
                                                if(c6.data) console.log(c6.data);
                                            }
                                            //console.log(c5.name,c5.children[0].data);
                                        }
                                        //console.log(cccc.children[3]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //console.log(child.attribs.class);
        }
        //console.log(list.length, list.hasClass('main clearfix w960'));
    }
}