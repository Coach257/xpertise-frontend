<template>
  <article class="search-result">

  <div class="search-result__heading">
    <i class="el-icon-document"></i>
    <div id='docTitle'>
      {{ result.title.raw }}
    </div>
  </div>

   <div class="search-result__subhead">
      <div id="calender">
         <svg class="icon" width="30px" height="30px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M507.05615234 833.35009765h-308.99047849c-27.19116212 0-49.43847655-7.41577148-66.74194338-24.71923829-7.41577148-7.41577148-9.8876953-17.30346679-9.8876953-27.19116209v-469.66552735c0-27.19116212 29.66308594-49.43847655 64.27001952-51.91040039h64.27001953c9.8876953 0 14.83154297-2.47192383 14.83154297-9.88769531v-19.77539063c4.94384766-19.77539065 19.77539065-29.66308594 44.4946289-29.66308593 19.77539065 0 34.6069336 12.35961914 37.07885743 32.13500976v2.47192383c2.47192383 27.19116212 2.47192383 27.19116212 34.60693359 27.19116212h269.43969727c12.35961914 0 17.30346679-2.47192383 17.30346679-12.35961915v-17.3034668c2.47192383-19.77539065 19.77539065-29.66308594 42.02270508-29.66308594 22.24731445 0 37.07885742 12.35961914 39.55078125 29.66308594 0 9.8876953-4.94384766 22.24731445 2.47192383 27.19116211 9.8876953 4.94384766 24.71923828 2.47192383 37.07885742 2.47192384h37.07885743c37.07885742 2.47192383 66.74194336 24.71923828 66.74194335 54.38232421v464.72167969c0 32.13500977-32.13500977 54.38232422-76.62963867 56.85424804-98.87695313-4.94384766-205.16967773-4.94384766-308.99047852-4.94384766z m2.47192383-422.6989746h-308.99047851c-12.35961914 0-17.30346679 2.47192383-17.30346681 12.35961913v341.12548829c0 14.83154297 7.41577148 17.30346679 22.24731446 17.3034668h608.09326172c22.24731445 0 22.24731445 0 22.24731445-17.3034668V425.48266602c0-12.35961914-2.47192383-14.83154297-17.30346679-14.83154297h-308.99047852z" fill="#666666" /><path d="M316.71801758 707.28198242H277.16723633c-17.30346679 0-24.71923828-7.41577148-27.19116211-19.77539062v-42.02270508c0-12.35961914 9.8876953-19.77539065 24.71923828-19.77539063h84.04541016c17.30346679 0 24.71923828 7.41577148 24.71923828 22.24731446v39.55078125c0 12.35961914-7.41577148 19.77539065-24.71923828 19.77539062h-42.02270508z m192.81005859 0h-39.55078125c-17.30346679 0-27.19116212-7.41577148-27.19116211-19.77539062V647.95581055c0-14.83154297 7.41577148-19.77539065 24.71923829-22.24731446H549.07885742c14.83154297 0 24.71923828 7.41577148 24.71923828 19.77539063v42.02270508c0 12.35961914-9.8876953 19.77539065-24.71923828 19.77539062h-39.55078125z m192.8100586-81.57348633h42.02270507c14.83154297 0 24.71923828 7.41577148 22.24731446 19.77539063v44.4946289c0 12.35961914-9.8876953 19.77539065-24.71923828 19.77539063H657.84350586c-14.83154297 0-24.71923828-7.41577148-24.71923828-19.77539063V647.95581055c0-12.35961914 9.8876953-19.77539065 24.71923828-19.77539064 14.83154297-4.94384766 29.66308594-2.47192383 44.49462891-2.47192382z m-192.8100586-59.32617187h-42.02270507c-17.30346679 0-24.71923828-4.94384766-24.71923829-19.77539062v-44.49462892c0-12.35961914 7.41577148-17.30346679 22.24731446-17.3034668h86.51733398c14.83154297 0 22.24731445 7.41577148 24.71923828 19.77539064v42.02270508c0 12.35961914-7.41577148 19.77539065-24.71923828 19.77539062h-42.02270508zM316.71801758 484.80883788h42.02270508c14.83154297 0 24.71923828 7.41577148 24.71923828 17.30346682v44.4946289c0 12.35961914-7.41577148 17.30346679-22.24731447 17.30346679h-86.51733397c-14.83154297 0-22.24731445-4.94384766-22.24731444-17.30346679V499.64038086c0-12.35961914 9.8876953-17.30346679 24.71923827-17.3034668 12.35961914 2.47192383 24.71923828 2.47192383 39.55078125 2.47192382z m383.14819337 81.57348634h-42.02270509c-14.83154297 0-24.71923828-7.41577148-24.71923828-19.77539064v-44.49462888c0-12.35961914 7.41577148-17.30346679 22.24731445-17.30346682h86.51733399c14.83154297 0 22.24731445 7.41577148 22.24731445 17.30346682v44.49462888c0 9.8876953-7.41577148 17.30346679-22.24731445 17.30346681-12.35961914 2.47192383-27.19116212 2.47192383-42.02270507 2.47192383z" fill="#666666" /></svg>
         <div class="subheadnum">
          {{result.year.raw}}年
        </div>
      </div>

      <div id="citation">
        <svg class="icon" width="21px" height="21px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M321.40024 143.1c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7s-98.1 210.7-219.1 210.7S0.00024 801 0.00024 684.6c-0.2-222 123.6-427.1 321.4-541.5z m584.3 0.7c22.4-17 53-19.9 78.4-7.4s40.9 38 39.8 65.4-18.8 51.6-45.1 62.1c-86.6 49.8-156 123.1-199.4 210.7h24.1c121 0 219.1 94.3 219.1 210.7S924.50024 896 803.50024 896s-219.1-94.3-219.1-210.7c0-221.7 123.8-427.2 321.3-541.5z" fill="#666666" /></svg>
        <div class="subheadnum">
          {{ result.n_citation.raw }}次
        </div>
      </div>
   </div>


  <div class="search-result__authors">
    <div class="search-result__author" style="font-weight: 600;">作者</div>
    <div class="search-result__author" v-for="(author, i) in this.authors" :key='i'>{{author}}</div>
  </div>





    <div class="search-result__body">
      <div class="search-result__data">
        <div v-if="result.doc_type">文献类型: {{ result.doc_type.raw }}</div>
        <div v-if="result.id">文献编号: {{result.id.raw}}</div>

      <!--  <div v-if="result.n_citation">被引次数: {{ result.n_citation.raw }}</div>
        <div v-if="result.year">年份: {{ result.year.raw }}</div>
        <div v-if="result.publisher">出版社: {{ result.publisher.raw }}</div>
        <br/>
        <div v-if="result.page_start">Page_start: {{ result.page_start.raw }}</div>
        <div v-if="result.page_end">Page_end: {{ result.page_end.raw }}</div>
        <br />
        <div v-if="result.issue">Issue: {{ result.issue.raw }}</div>
        <div v-if="result.volume">volume: {{ result.volume.raw }}</div> -->
        <div v-if="result.venue">venue: {{ result.venue.raw }}</div>
      </div>
    </div>

  </article>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      authors: []
    }
  },
  methods: {
    addToAuthors (value, index, array) {
      this.authors.push(JSON.parse(value).name)
    }
  },
  mounted() {
    // console.log(this.result.venue.raw)
    this.result.authors.raw.forEach(this.addToAuthors)
  }
};
</script>

<style scoped>
.search-result {
  /* outline: #21ff06 dotted thick; */
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  align-items: center;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-result__heading {
  display: flex;
  align-items: flex-start;
}
.el-icon-document {
  font-size: 30px;
  font-weight: 500;
  margin-right: 15px;

  position: relative;
  top: 3px;
}
#docTitle {
  font-size: 18px;
  font-weight: bolder;
}
.search-result__subhead {
  /* outline: #21ff06 dotted thick; */
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 12px;
}
#calender {
  display: flex;
  align-items: center;
}
#citation {
  display: flex;
  align-items: center;
}
.subheadnum {
  margin-left: 10px;
  font-size: 15px;
  font-weight: 550;
  color: #666666;
}
.search-result__authors {
  /* outline: #21ff06 dotted thick; */

  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgb(127,127,127,0.15);
  padding: 15px;

  width: 400px;
  margin-top: 20px;

  display: flex;
  flex-wrap: wrap;

}
.search-result__author {
  border-radius: 10px;
  background-color: #26BEB8;
  color: white;

  font-size: 14px;
  font-weight: 500;

  padding: 2px 8px 2px 8px;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-top: 3px;
}



.search-result__body {
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
}

.search-result__data {
  padding-top: 50px;
}

.search-result__flavor {
  margin: 0;
}

.search-result__image {
  flex: none;
  width: 256px;
  height: 387px;
}
</style>
