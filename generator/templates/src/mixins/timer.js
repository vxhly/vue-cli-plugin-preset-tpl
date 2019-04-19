import moment from 'moment';

export default {
  data() {
    return {
      nowMonth: moment().format('YYYY/MM'),
      nowDay: moment().format('YYYY/MM/DD')
    };
  },
  methods: {
    /**
     * 获取当前时间的前一月的月份
     * @method prevMonth
     * @param current 当前的月份
     */
    prevMonth(current) {
      const $current = current && new Date(current) ? current : this.nowMonth;
      const now = new Date($current);
      let prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
      prevMonth = moment(prevMonth).format('YYYY/MM');
      this.nowMonth = prevMonth;
      return prevMonth;
    },
    /**
     * 获取当前时间的下一月的月份
     * @method prevMonth
     * @param current 当前的月份
     */
    nextMonth(current) {
      const $current = current && new Date(current) ? current : this.nowMonth;
      const now = new Date($current);
      let prevMonth = new Date(now.getFullYear(), now.getMonth() + 1);
      prevMonth = moment(prevMonth).format('YYYY/MM');
      this.nowMonth = prevMonth;
      return prevMonth;
    },
    /**
     * 获取当前时间的前一天的日期
     * @method prevMonth
     * @param current 当前的日期
     */
    prevDay(current) {
      const $current = current && new Date(current) ? current : this.nowDay;
      const now = new Date($current);
      let prevDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      prevDay = moment(prevDay).format('YYYY/MM/DD');
      this.nowDay = prevDay;
      return prevDay;
    },
    /**
     * 获取当前时间的后一天的日期
     * @method prevDay
     * @param current 当前的月份
     */
    nextDay(current) {
      const $current = current && new Date(current) ? current : this.nowDay;
      const now = new Date($current);
      let prevDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      prevDay = moment(prevDay).format('YYYY/MM/DD');
      this.nowDay = prevDay;
      return prevDay;
    },
    /**
     * 获取本月的月份
     * @method currentMonth
     */
    currentMonth() {
      const nowMonth = moment().format('YYYY/MM');
      this.nowMonth = nowMonth;
      return nowMonth;
    },
    /**
     * 获取今天的日期
     * @method currentDay
     */
    currentDay() {
      const nowDay = moment().format('YYYY/MM/DD');
      this.nowDay = nowDay;
      return nowDay;
    }
  }
};
