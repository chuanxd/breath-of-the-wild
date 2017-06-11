# 工業化與台灣空氣品質的視覺化呈現

## 試圖解決的問題：


台灣的空氣污染日益嚴重，而2016年工業占GDP比重則為35.04％，透過工廠的位置分布與空氣品質的視覺化呈現，從不同的觀點來尋找可能影響空氣品質的因素。

## 如何實作：

透過政府的開放資料，取得工廠,  觀測站和空氣品質的相關資訊，將其標註在地圖上。

## DEMO:
```
https://chuanxd.github.io/breath-of-the-wild/dist/index#/
```

## 如何應用：
透過工廠密集程度可以作為重點觀測區域，如果空氣品質不佳，可以進一步分析該區工廠的類型與污染物排放量，可以作為未來觀測站建置的參考。

## 對於開放資料的建議：
**工廠登記名錄**
- 資料如果能以 json 格式取代 csv 更易使用
- 缺少經緯度
- 地址有全形半形不統一的情況，甚至是地址錯誤，導致轉換不出座標

**空氣品質監測月值**
**資料的結構不易使用**

**工廠多的地方，監測站明顯不足**

**欄位名稱不要中文**

**欄位缺少格式 及 規則說明**
  - http://data.gov.tw/node/28202
  - 濃度的部分資料格式為字串 (“143.678”)，部分資料裡無監測值使用 “x” 來表示，不符合Developer Friendly APIs.

**自動生成API : 資料放上去可以自己分析資料的結構，然後生成API**
  - 由中央統一管理API格式
  - 讓理解資料的人，可以針對資料的特性設計簡易的搜尋方式
  - 自動生成API，加快資料開放的更新速度

**單位定義要更友善**

## Build Setup
``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
# build for production and view the bundle analyzer report
npm run build --report
```
