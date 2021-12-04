import { logger } from '../config/winston';

const checkError = (
    startDayOfWeek: number,
    startHour: number,
    startMin: number,
    intervalSecond: number
) => {
    if (intervalSecond / (60 * 60 * 24) > 23) {
        throw new Error('\x1b[31mError: lib.Scheduler: TimeInterval is TOO long\x1b[0m\n');
    }
    if (startDayOfWeek > 6 || startDayOfWeek < 0) {
        throw new Error('\x1b[31mError: lib.Scheduler: startDayOfWeek value is Wrong\x1b[0m\n');
    }
    if (startHour > 23 || startHour < 0) {
        throw new Error('\x1b[31mError: lib.Scheduler: startHour value is Wrong\x1b[0m\n');
    }
    if (startMin > 59 || startMin < 0) {
        throw new Error('\x1b[31mError: lib.Scheduler: startMin value is Wrong\x1b[0m\n');
    }
    if (intervalSecond < 0) {
        throw new Error('\x1b[31mError: lib.Scheduler: TimeInterval is Wrong\x1b[0m\n');
    }
};

const getKoreaDate = (date): Date => {
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000);
    return date;
};

const getTargetDate = (
    startDayOfWeek: number,
    startHour: number,
    startMin: number,
    intervalSecond: number
): Date => {
    const today = getKoreaDate(new Date());
    let targetDate = getKoreaDate(new Date());

    targetDate.setHours(startHour);
    targetDate.setMinutes(startMin);
    targetDate.setSeconds(0);

    while (targetDate.getTime() - today.getTime() < 0)
        targetDate = new Date(targetDate.getTime() + intervalSecond * 1000);

    if (targetDate.getDay() != startDayOfWeek)
        targetDate.setDate(targetDate.getDate() + ((startDayOfWeek - targetDate.getDay() + 7) % 7));

    return targetDate;
};

const Scheduler = (
    startDayOfWeek: number,
    startHour: number,
    startMin: number,
    intervalSecond: number,
    callback: () => void
): (() => void) => {
    checkError(startDayOfWeek, startHour, startMin, intervalSecond);

    let timerId;
    const today = getKoreaDate(new Date());
    const targetDate = getTargetDate(startDayOfWeek, startHour, startMin, intervalSecond);
    const targetTimeInterval = targetDate.getTime() - today.getTime();

    const request = () => {
        callback();
        timerId = setTimeout(request, intervalSecond * 1000);
    };

    logger.info(
        `스케줄러 설정됨: ${new Date(
            new Date().getTime() + targetTimeInterval
        )}\n\t한국기준: ${targetDate}`
    );

    timerId = setTimeout(request, targetTimeInterval);
    return () => {
        clearTimeout(timerId);
    };
};

export default Scheduler;
