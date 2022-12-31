import { useEffect, useState } from 'react';
import { getMaterialList } from '../../api';
import { Spin, Result, Button, FloatButton } from 'antd';
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

  async function fetchData() {
    setSpinning(true);    
    const result = await getMaterialList();
    setData(result);
    setSpinning(false);
  }

  const [data, setData] = useState<Array<any>>([]);

  const [spinning, setSpinning] = useState<boolean>(true);
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin tip="Loading..." spinning={ spinning } delay={ 100 }>
      <div style={{ minHeight: '100vh' }}>
        <FloatButton
          type="primary"
          shape="square"
          description="Form"
          style={{ 'width': 100, 'right': 'calc(50% - 50px)' }}
          href="/form"
        />
        <div className="cardList">
          {
            data.length > 0 ? (
              data.map((item: data, index) => {
                return (
                  <Card
                    key={ item.id }
                    item={ item }
                    onClick={ () => del(index) }
                  ></Card>
                )
              })
            )
            : spinning === false ?
            (
              <div className="center">
                <Result
                  title="加载完成，数据为空"
                  extra={
                    <Button type="primary" onClick={ fetchData }>
                      重新加载
                    </Button>
                  }
                />
              </div>
            )
            :
            (
              <div className="center">
                <Result
                  status="404"
                  title="No Data"
                />
              </div>
            )
          }
        </div>
      </div>
    </Spin>
  );
};
export default List;