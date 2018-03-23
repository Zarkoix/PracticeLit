import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('submit')
  return res.status(200).json({
    testCasesPassed: 1,
    testCasesFailed: 1,
    testCaseInfo: [{
      name: "Test Case 1",
      isPassed: true,
      givenInput: "1-5",
      expectedOutput: "12345",
      givenOutput: "12345"
    }, {
      name: "Test Case 2",
      isPassed: false,
      givenInput: "5-1",
      expectedOutput: "54321",
      givenOutput: "abcde"
    }]
  })
});

export default router;
