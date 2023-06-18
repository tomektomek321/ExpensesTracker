using System.Globalization;
using System;

namespace webapi.Extensions {
    public static class DateTimeExtensions {
        public static int GetWeekNumber(this DateTime pDate) {
            CalendarWeekRule weekRule = CalendarWeekRule.FirstDay; 
            DayOfWeek firstDayOfWeek = DayOfWeek.Monday;
            var cultureInfo = CultureInfo.CurrentCulture;
            return cultureInfo.Calendar.GetWeekOfYear(pDate, weekRule, firstDayOfWeek);
        }
    }
}
