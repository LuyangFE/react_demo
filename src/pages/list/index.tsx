import { useEffect, useState } from 'react';
import { getMaterialList } from '../../api';
import { Spin } from 'antd';
import Card from './components/card';
import './style.css';

export interface data {
  id: number,
  name: string,
  thumbnailSrc: string,
  shareNum: number,
  downNum: number,
  visitNum: number,
  extensionTag: string,
  size: string,
};

const List = () => {

  function del(index: number) {
    let res = data.slice();
    res.splice(index, 1);
    setData(res);
  };

  const [data, setData] = useState<Array<any>>([]);

  const [spinning, setSpinning] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMaterialList();
      setData(result);
      setSpinning(false);
    }
    fetchData();
  }, []);

  return (
    <Spin tip="Loading..." spinning={ spinning } delay={ 500 }>
      <div style={{ minHeight: '100vh' }}>
        <div className="cardList">
          {
            data.map((item: data, index) => {
              return (
                <Card
                  key={ item.id }
                  item={ item }
                  onClick={ () => del(index) }
                ></Card>
              )
            })
          }
        </div>
      </div>
    </Spin>
  );
};
export default List;