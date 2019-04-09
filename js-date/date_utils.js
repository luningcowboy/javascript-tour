class DateUtils{

    static formatTime(time){
        let ret = '';
        let date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
    static getSundayByTime(time = 0, is_format = false){
        if(time === 0) time = new Date().getTime();
        let date = new Date(time);
        let day = date.getDay();
        let one_day_time = 24 * 60 * 60 * 1000;
        let sunday_time = date - day * one_day_time;
        
        return is_format ? DateUtils.formatTime(sunday_time) : sunday_time; 
    }
    /**
     * 根据时间获取周一的时间
     * @param time 指定时间
     * @param is_format 是否格式化
     */
    static getMondayByTime(time = 0, is_format = false){
        let sunday_time = DateUtils.getSundayByTime(time);
        let one_day_time = 24 * 60 * 60 * 1000;
        let monday_time = sunday_time + one_day_time;
        return is_format ? DateUtils.formatTime(monday_time) : monday_time;
    }
    /**
     * 获取周二时间
     */
    static getTuesdayByTime(time = 0, is_format = false){
        let sunday_time = DateUtils.getSundayByTime(time);
        let one_day_time = 24 * 60 * 60 * 1000;
        let tuesday_time = sunday_time + 2 * one_day_time;
        return is_format ? DateUtils.formatTime(tuesday_time): tuesday_time;
    }

    /**
     * 获取周三时间
     */
    static getWednesdayByTime(time = 0, is_format = false){
        let sunday_time = DateUtils.getSundayByTime(time);
        let one_day_time = 24 * 60 * 60 * 1000;
        let wednesday_time = sunday_time + 3 * one_day_time;
        return is_format ? DateUtils.formatTime(wednesday_time) : wednesday_time;
    }

    /**
     * 获取周四时间
     */
    static getThursdayByTime(time = 0, is_format = false){
        let sunday_time = DateUtils.getSundayByTime(time);
        let one_day_time = 24 * 60 * 60 * 1000;
        let thursday_time = sunday_time + 4 * one_day_time;

        return is_format ? DateUtils.formatTime(thursday_time) : thursday_time;
    }

    /**
     * 获取周五时间
     */
    static getFridayByTime(time = 0, is_format = false){
        let sunday_time = DateUtils.getSundayByTime(time);
        let one_day_time = 24 * 60 * 60 * 1000;
        let friday_time = sunday_time + 5 * one_day_time;

        return is_format ? DateUtils.formatTime(friday_time) : friday_time;
    }


    /**
     * 获取周六时间
     */
    static getSaturdayByTime(time = 0, is_format = false){
        let sunday_time = DateUtils.getSundayByTime(time);
        let one_day_time = 24 * 60 * 60 * 1000;
        let saturday_time = sunday_time + 6 * one_day_time;

        return is_format ? DateUtils.formatTime(saturday_time) : saturday_time;
    }

    /**
     * 获取星期标识
     * 2018-12-9~2018-12-15
     */
    static getWeekTagByTime(time = 0){
        let sunday = DateUtils.getSundayByTime(time, true);
        let saturday = DateUtils.getSaturdayByTime(time, true);
        return `${sunday}~${saturday}`;
    }

    /**
     * 根据周日的日期tag,获取整个星期的tag列表
     */
    static getWeekTagsBySundayTag(tag){
        let [y,m,d] = [...tag.split('-')];
        let ret = [];
        let date = new Date();
        date.setFullYear(parseInt(y));
        date.setMonth(parseInt(m - 1));
        date.setDate(parseInt(d));
        let sunday_time = date.getTime();
        if(date.getDay() !== 0){
            // 不是周日
            sunday_time = DateUtils.getSundayByTime(sunday_time);
        }
        let one_day_time = 24 * 60 * 60 * 1000;
        for(let i = 0; i <= 6; ++i){
            let t_time = sunday_time + i * one_day_time;
            ret.push(DateUtils.formatTime(t_time));
        }
        return ret;
    }
}


module.exports = DateUtils;
