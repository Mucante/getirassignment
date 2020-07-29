const RecordAPI = require('./api/record');

var testreq = {
    body: {
        minCount: Number,
        maxCount: Number,
        startDate: String,
        endDate: String
    }
}

test('all parameters valid, should return null', () => {
    testreq.body.minCount = 2700;
    testreq.body.maxCount = 3000;
    testreq.body.startDate = "2016-01-26";
    testreq.body.endDate = "2018-02-02";
    expect(RecordAPI.validateRecordRequestParams(testreq)).toBe(null);
});

test('minCount is not a valid number, test should return error', () => {
    testreq.body.minCount = "2fdsdsf700";
    testreq.body.maxCount = 3000;
    testreq.body.startDate = "2016-01-26";
    testreq.body.endDate = "2018-02-02";
    expect(RecordAPI.validateRecordRequestParams(testreq)).toBeInstanceOf(Error);
});

test('maxCount is less than minCount, test should return error', () => {
    testreq.body.minCount = 3500;
    testreq.body.maxCount = 2900;
    testreq.body.startDate = "2016-01-26";
    testreq.body.endDate = "2018-02-02";
    expect(RecordAPI.validateRecordRequestParams(testreq)).toBeInstanceOf(Error);
});

test('Month of startDate is wrong, test should return error', () => {
    testreq.body.minCount = 2600;
    testreq.body.maxCount = 3000;
    testreq.body.startDate = "2016-25-26";
    testreq.body.endDate = "2018-03-02";
    expect(RecordAPI.validateRecordRequestParams(testreq)).toBeInstanceOf(Error);
});

test('Day of startDate is wrong, test should return error', () => {
    testreq.body.minCount = 2600;
    testreq.body.maxCount = 3000;
    testreq.body.startDate = "2016-02-88";
    testreq.body.endDate = "2018-03-02";
    expect(RecordAPI.validateRecordRequestParams(testreq)).toBeInstanceOf(Error);
});

test('Year of startDate is wrong, test should return error', () => {
    testreq.body.minCount = 2600;
    testreq.body.maxCount = 3000;
    testreq.body.startDate = "22016-02-03";
    testreq.body.endDate = "2018-03-02";
    expect(RecordAPI.validateRecordRequestParams(testreq)).toBeInstanceOf(Error);
});

test('startDate is older compared to the endDate, test should return error', () => {
    testreq.body.minCount = 2600;
    testreq.body.maxCount = 3000;
    testreq.body.startDate = "2019-05-03";
    testreq.body.endDate = "2018-03-11";
    expect(RecordAPI.validateRecordRequestParams(testreq)).toBeInstanceOf(Error);
});