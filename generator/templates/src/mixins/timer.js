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
     * 将传入的时间格式化成 {startDate: 时间戳, endDate: 时间戳}
     * @method formatDate
     * @param {Date}    date  能够被 new Date() 解析的时间格式
     * @param {String}  type  byTime|byDay|byMonth 
     *                        byTime  => 2019/4/1 00:00:00.0~2019/4/1 00:59:59.999
     *                        byDay   => 2019/4/1 00:00:00.0~2019/4/1 23:59:59.999
     *                        byMonth => 2019/4/1 00:00:00.0~2019/4/30 23:59:59.999
     */
    formatDate(date, type) {
      let payload = {
        startDate: null,
        endDate: null
      }

      let startDate = date ? new Date(date) : new Date()
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      startDate.setMilliseconds(0)

      let endDate = date ? new Date(date) : new Date()
      endDate.setHours(23)
      endDate.setMinutes(59)
      endDate.setSeconds(59)
      endDate.setMilliseconds(999)

      if (type === 'byMonth') {
        startDate.setDate(1)
        endDate.setMonth(startDate.getMonth() + 1)
        endDate.setDate(0)
      }

      if (type === 'byTime') {
        startDate.setHours(new Date(date).getHours())
        endDate.setHours(new Date(date).getHours())
      }

      payload.startDate = startDate.getTime()
      payload.endDate = endDate.getTime()

      return payload
    },
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
