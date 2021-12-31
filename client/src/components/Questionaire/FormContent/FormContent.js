import React from 'react';
import './styles.css';

const FormContent = ({formData, setFormData}) => {

    const deleteItem = (obj) => {
        const data=formData;
        data.map((item) => (item?.tag === obj.tag) && (
            (obj.pattern !==null) && (item.patterns = item.patterns.filter(i => i!==obj.pattern)),
            (obj.response !==null) && (item.responses = item.responses.filter(i => i!==obj.response))    
          ));
        data.map((item) => (item.patterns.length!==0 || item.responses.length!==0));
        setFormData(data);
        setFormData([...formData]);
      }
      
    return (
        <div className="inputStatus">
          <h2>You have added :-</h2>
          {(formData!=null && formData.length!==0) ? (formData.map((item) => (item.responses.length!==0 || item.patterns.length!==0) && (<div key={item.tag} className="item">
            <h3>Tag : {item.tag}</h3>
            <div className="itemContent">
              <div className="statements">
                <h3>Statements</h3>
                <ol className="innerBox">
                {item.patterns.map((i) => (<li key={i}>{i} <div className="deleteItem" onClick={() => deleteItem({tag:item.tag, pattern:i,response:''})}>+</div></li>))}
                </ol>
              </div>
              <div className="replys">
                <h3>Reply's</h3>
                <ol className="innerBox">
                {item.responses.map((i) => (<li key={i}>{i} <div className="deleteItem" onClick={() => deleteItem({tag:item.tag, pattern:'',response:i})}>+</div></li>))}
                </ol>
              </div>
            </div>
          </div>))): (<h3>No items to display.</h3>)}
      </div>
    )
}

export default FormContent;
