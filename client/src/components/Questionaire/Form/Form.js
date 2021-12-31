import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE } from '../../../constants/actionTypes';

import './styles.css';

const Form = ({ formData, setFormData, store }) => {
    const [formItem, setFormItem] = useState({tag:'', pattern:'', response:''});
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleAddItem = () => {
        const data = formData;
        var flag = false;
        data.map((item) => (item?.tag === formItem.tag) && (
            (formItem.pattern !==null) && (item.patterns = item.patterns.filter(i => i!==formItem.pattern)),
            (formItem.response !==null) && (item.responses = item.responses.filter(i => i!==formItem.response))    
        ));
        data.filter((item) => (item.patterns.length!==0 || item.responses.length!==0));
        data.map((item) => (item?.tag===formItem.tag) && (
            (formItem.pattern !== null) && item.patterns.push(formItem.pattern),
            (formItem.response !== null) && item.responses.push(formItem.response),
            flag=true
        )
        );
        (flag===false && formItem.tag!==null) && data.push({tag: formItem.tag, patterns: [formItem.pattern], responses: [formItem.response]});
        setFormData(data);
        setFormData([...formData]);
    }

    const dispatch = useDispatch();

    const handleDefaultData = () => {
        const cb = document.getElementById('dataId');
        if(cb.checked)
        {
            dispatch({type: UPDATE, payload: { dataId:"1", isTrained:store.isTrained }});
            document.getElementById('select').disabled = true;
            document.getElementById('category').disabled = true;
            document.getElementById('statement').disabled = true;
            document.getElementById('reply').disabled = true;
            document.getElementById('addItem').disabled=true;

        }
        else
        {
            dispatch({type: UPDATE, payload: { dataId: user?.result.Id, isTrained:store.isTrained }});
            document.getElementById('select').disabled = false;
            document.getElementById('category').disabled = false;
            document.getElementById('statement').disabled = false;
            document.getElementById('reply').disabled = false;
            document.getElementById('addItem').disabled = false;
        }
    }

    return (
        <div className="form">
            <div className="formItem">
            <div className="leftItem">
                <label htmlFor="category">Category:</label>
                <select id="select" name="category" onChange={(e) => setFormItem({...formItem, tag: e.target.value})}>
                    <option value="Choose a category">Choose a category...</option>
                <option value="greeting" >Greeting</option>
                <option value="goodbye" >Goodbye</option>
                <option value="thanks" >Thanks</option>
                <option value="help" >Help</option>
                </select>
            </div>
            <div className="rightItem">
                <label htmlFor="pattern">Other Category (If not in list)*</label>
                <input type="text" id='category' value={formItem.tag} onChange={(e) => setFormItem({...formItem, tag: e.target.value})} required/>
            </div>
            </div>
            
            <div className="formItem">
            <div className="leftItem">
                <label htmlFor="pattern">Statement</label>
                <input type="text" id='statement'  value={formItem.pattern} onChange={(e) => setFormItem({...formItem, pattern: e.target.value})}/>
            </div>
            <div className="rightItem">
                <label htmlFor="pattern">Reply</label>
                <input type="text" id='reply' value={formItem.response} onChange={(e) => setFormItem({...formItem, response: e.target.value})}/>
            </div>
            </div>
            <label htmlFor="default" className='checkBox'>
                <input type="checkbox" id="dataId" name="default" onClick={handleDefaultData}/> Use Default Dataset
            </label>
            <button className="addItem" id='addItem' onClick={handleAddItem}>Add</button>
        </div>
    )
}

export default Form;
