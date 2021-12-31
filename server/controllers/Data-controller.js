import fs from 'fs';
const dataPath = './model/Data/intent.json';

const getDataList = () => {
    const jsonData = fs.readFileSync(dataPath);

    return JSON.parse(jsonData);
}
const saveDataList = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
}

export const getData = async (req,res) => {
    try {
        const data = getDataList();
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

const arrayUnique = (a) => {
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

export const updateData = async (req, res) => {
    const formData = req.body;
    const id = req.params.id;

    try {
        const dataList = getDataList();
        const existingData = dataList[id];

        for(var i=0; i<formData.length; ++i)
        {
            var flag = false;
            for(var j=0;j<existingData.length; ++j)
            {
                if(formData[i].tag===existingData[j].tag)
                {
                    var finalPatterns = existingData[j].patterns.concat(formData[i].patterns);
                    existingData[j].patterns=arrayUnique(finalPatterns);

                    var finalResponses = existingData[j].responses.concat(formData[i].responses);
                    
                    existingData[j].responses=arrayUnique(finalResponses);
                    flag=true;
                }
            }
            if(flag===false)
            existingData.push(formData[i]);
        }
        dataList[id]=existingData;
        saveDataList(dataList);
        
        res.send({existingData});
    } catch (error) {
        res.send(error);
    }
}

const paramsPath = './model/Data/hyperparams.json';

const saveParamsList = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(paramsPath, stringifyData);
}

export const updateParams =  (req, res) => {
    const formData = req.body;
    // const id = req.params.id;
    try {
        saveParamsList(formData);
        res.send({message:'success'});
    } catch (error) {
        res.send(error);
    }
}