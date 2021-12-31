import React,{ useState, useEffect } from 'react';
import { submitParams } from '../../api';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';

import './styles.css';
import { UPDATE } from '../../constants/actionTypes';

const Train = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isLoading, setIsLoading] = useState(false);
    const vars = useSelector(state => state.Vars);
    console.log(vars)

    const dispatch = useDispatch();

    const defaultParams = {
        BatchSize : 16,
        LearningRate : 0.002,
        NumberOfEpochs : 1500,
        NeuronsInHiddenLayer : 16,
        DepthOfModel: 13,
        SavedWeights: "./Model Weights/weight1.pth"
    };
    
    const [customParams, setCustomParams] = useState({
        BatchSize : undefined,
        LearningRate : undefined,
        NumberOfEpochs : undefined,
        NeuronsInHiddenLayer : undefined,
        DepthOfModel: undefined,
        SavedWeights: "./Model Weights/weight1.pth"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(document.getElementById('dataId').checked)
        await submitParams(defaultParams);
        else
        await submitParams(customParams);
        setIsLoading(true);

        fetch('/train', {
            method: 'POST',
            body: JSON.stringify({ id: vars.dataId }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(r => {console.log(r);setIsLoading(false); dispatch({type: UPDATE, payload: { dataId: vars.dataId, isTrained: true }});})
          .catch((error) => {
            console.log(`Error: ${error}`);
        });
    }
    useEffect(() => {
        if(vars.isTrained)
        window.location='/';
    }, [vars.isTrained])

    const handleDefaultParam = () => {
        const cb = document.getElementById('dataId');
        if(cb.checked)
        {
            document.getElementById('batchsize').disabled = true;
            document.getElementById('rate').disabled = true;
            document.getElementById('epoch').disabled = true;
            document.getElementById('layer').disabled = true;
            document.getElementById('depth').disabled=true;

        }
        else
        {
            // dispatch({type: UPDATE, payload: { dataId: user?.result.Id, isTrained:store.isTrained }});
            document.getElementById('batchsize').disabled = false;
            document.getElementById('rate').disabled = false;
            document.getElementById('epoch').disabled = false;
            document.getElementById('layer').disabled = false;
            document.getElementById('depth').disabled = false;
        }
    }

    return (
        <>
        <div className='train'>
            <div className="trainContainer">
            <div className="title">
                    Enter Hyper-Parameters according to the Dataset
            </div>
            <form className='hyperParameters'onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="batchSize">Batch Size</label>
                    <input type="number" id='batchsize' value={customParams.BatchSize} onChange={(e) => setCustomParams({...customParams, BatchSize:e.target.value})} required />
                </div>
                <div className="input">
                    <label htmlFor="batchSize">Learning Rate</label>
                    <input type="text" id='rate' value={customParams.LearningRate} onChange={(e) => setCustomParams({...customParams, LearningRate:e.target.value})} required/>
                </div><div className="input">
                    <label htmlFor="batchSize">No. of Epochs</label>
                    <input type="text" id="epoch" value={customParams.NumberOfEpochs} onChange={(e) => setCustomParams({...customParams, NumberOfEpochs:e.target.value})} required />
                </div><div className="input">
                    <label htmlFor="batchSize">Neurons in hidden layer</label>
                    <input type="text" id="layer" value={customParams.NeuronsInHiddenLayer} onChange={(e) => setCustomParams({...customParams, NeuronsInHiddenLayer:e.target.value})} required />
                </div><div className="input">
                    <label htmlFor="batchSize">Depth of model</label>
                    <input type="text" id="depth" value={customParams.DepthOfModel} onChange={(e) => setCustomParams({...customParams, DepthOfModel:e.target.value})} required />
                </div>
                <label htmlFor="default" className='checkBox'>
                    <input type="checkbox" id="dataId" name="default" value="yes" onClick={handleDefaultParam}/> Use Default Params
                </label>
                <button className='btn-primary-submit' type='submit'>Train</button>
            </form>
            </div>
            {isLoading && <Loading />}
        </div>
        </>
    )
}

export default Train