import * as React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { withStyles } from "@material-ui/core/styles";
import {
  ViewSwitcher,
  DayView,
  MonthView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";

const styles = (theme) => ({
  container: {
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "flex-end",
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      //data: appointments,
      currentDate: "2018-06-27",
      locale: "bg-BG",
    };

    this.changeLocale = (event) =>
      this.setState({ locale: event.target.value });
  }

  render() {
    const { data, currentDate, locale } = this.state;

    return (
      <div>
        <Paper>
          <Scheduler data={data} locale={locale} height={635}>
            <ViewState
              defaultCurrentDate={currentDate}
              defaultCurrentViewName="Week"
            />
            <WeekView startDayHour={9} endDayHour={19} />
            <DayView />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <AllDayPanel />
            <ViewSwitcher />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
