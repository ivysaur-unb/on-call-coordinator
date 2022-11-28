export function formatData(dataIn){
    let rows = [];
    console.log(dataIn.classes);

    if(dataIn.length>1){
        for(let i = 0; i<dataIn.length; i++){
            
            let temp = {name: '', class1: '', class1L: '', class2: '', class2L: '', class3: '', class3L: '', class4: '', class4L: ''};
            temp.name = dataIn[i].name;
            //console.log(dataIn[i]);

            if(dataIn[i].classes){
                //console.log(dataIn[i].classes);

                    for(let k = 0; k<4; k++) {
                        if(dataIn[i].classes[k]){ //is there a class at k?
                            if(dataIn[i].classes[k].period === 1){ //is it taught at period? If yes, assemble temp; else don't do anything
                                temp.class1 = dataIn[i].classes[k].code;
                                if(dataIn[i].classes[k].location){
                                    temp.class1L = dataIn[i].classes[k].location
                                }
                            }
                            if(dataIn[i].classes[k].period === 2){ 
                                temp.class2 = dataIn[i].classes[k].code;
                                if(dataIn[i].classes[k].location){
                                    temp.class2L = dataIn[i].classes[k].location
                                }
                            }
                            if(dataIn[i].classes[k].period === 3){ 
                                temp.class3 = dataIn[i].classes[k].code;
                                if(dataIn[i].classes[k].location){
                                    temp.class3L = dataIn[i].classes[k].location
                                }
                            }
                            if(dataIn[i].classes[k].period === 4){ 
                                temp.class4 = dataIn[i].classes[k].code;
                                if(dataIn[i].classes[k].location){
                                    temp.class4L = dataIn[i].classes[k].location
                                }
                            }
                        }
                    }
                
                rows.push(temp);

                
            }
            
        }
    }
    else{
        let temp = {name: '', class1: '', class1L: '', class2: '', class2L: '', class3: '', class3L: '', class4: '', class4L: ''};
        temp.name = dataIn.name;

        if(dataIn.classes){
            for(let k = 0; k<4; k++) {
                if(dataIn.classes[k]){ //is there a class at k?
                    if(dataIn.classes[k].period === 0){ //is it taught at period? If yes, assemble temp; else don't do anything
                        temp.class1 = dataIn.classes[k].code;
                        if(dataIn.classes[k].location){
                            temp.class1L = dataIn.classes[k].location
                        }
                    }
                    if(dataIn.classes[k].period === 1){ 
                        temp.class2 = dataIn.classes[k].code;
                        if(dataIn.classes[k].location){
                            temp.class2L = dataIn.classes[k].location
                        }
                    }
                    if(dataIn.classes[k].period === 2){ 
                        temp.class3 = dataIn.classes[k].code;
                        if(dataIn.classes[k].location){
                            temp.class3L = dataIn.classes[k].location
                        }
                    }
                    if(dataIn.classes[k].period === 3){ 
                        temp.class4 = dataIn.classes[k].code;
                        if(dataIn.classes[k].location){
                            temp.class4L = dataIn.classes[k].location
                        }
                    }
                }
            }
        }
        rows.push(temp);
    }
    rows.sort(function( a, b ) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    return rows;
}