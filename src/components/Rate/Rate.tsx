import React, { useState } from "react";
import { ReactECharts } from "../../Echarts/ReactECharts"
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import getData from "../../services/getData";
import { filterDataBySymbol } from "../../utils/formatData";


interface IData {
    date: string;
    month: string;
    indicator: string;
    value: number;
}

interface IFindData {
  title: string;
  description: string;
  yData: Array<number>;
  xData: Array<string>;
  average: string;
}


const data: IData = await getData()

type Item = string
const items: Item[] = ['$', '€', '¥']

type Props = {
    value: string | null,
    setValue: React.Dispatch<React.SetStateAction<any>>;
}

const ChoiceCurrency: React.FC<Props> =  ({ value, setValue }) => {
    return (
        <ChoiceGroup
            value={value}
            onChange={({ value }) => setValue(value)}
            size={'xs'}
            items={items}
            getItemLabel={(item) => item}
            multiple={false}
            style={{
                position: 'absolute',
                top: '.5rem',
                right: '.5rem',
            }}
            name="ChoiceCurrency"
        />
    );
};


export const Rate = () => {
    const [ value, setValue ] = useState<Item | null>(items[0]);
    let findData : IFindData = filterDataBySymbol(value, data)
    
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        width: '70%'
      },
      title: {
        text: findData.title,
        textStyle: {
            color: '#002033',
            fontFamily: 'Inter',
            fontSize: '20px',
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: findData.xData,
        tooltip:{
          textStyle:{
            fontWeight: 'bold',
          },
        },
      },
      yAxis: {
        type: 'value',
        max: (value: any) => value.max + 5,
        min: (value: any) => value.min - 5,
      },
      series: [
        {
          data: findData.yData,
          name: findData.description,
          symbol: 'none',
          smooth: 0.15,
          type: 'line',
          color: "#F38B00",
          tooltip: {
            valueFormatter: (value: number): string => value + '₽'
          }
        }
      ],
      graphic: {
        elements: [
          {
            type: 'text',
            right: 30,
            bottom: 300,
            style: {
              text: 'Среднее за период',
              font: '16px Inter',
              fill: '#667985'
            }
          },
          {
            type: 'text',
            right: 35,
            bottom: 220,
            style: {
              text: findData.average,
              font: '48px Inter',
              fill: '#F38B00'
            }
          },
          {
            type: 'text',
            right: 15,
            bottom: 225,
            style: {
              text: '₽',
              font: '20px Inter',
              fill: '#667985'
            }
          }
        ]
      }
    }

    return (
    <div className="rate">
        <ReactECharts option={option} style={{width: '90%', height: '30rem'}}/>
        <ChoiceCurrency value={value} setValue={setValue}/>
    </div>
    )
}