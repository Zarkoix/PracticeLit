import express from 'express';

const router = express.Router();

const directoryData = {
  directory: [
      {
        name: 'Variables',
        isQuestion: false,
        id: '2',
        children: [
          {
            name: 'Question A',
            isQuestion: true,
            completed: false,
            id: '1'
          }, {
            name: 'Control Structures',
            isQuestion: false,
            completed: false,
            id: '3',
            children: [{
              name: 'for loop',
              isQuestion: true,
              completed: false,
              id: 'a'
            }, {
              name: 'for each loop',
              isQuestion: true,
              completed: false,
              id: 'b'
            }, {
              name: 'while loop',
              isQuestion: true,
              completed: true,
              id: 'c'
            }
            ]
          }, {
            name: 'Question 5',
            isQuestion: true,
            completed: false,
            id: '5'
          }]
      }, {
      name: 'Question 5',
      isQuestion: true,
      completed: true,
      id: '5'
    }],
  idToPrompt: {
    1: `<h1>Rigged Dice</h1>
<p>Write a method countMultiples that could be added to the IntTree class from lecture and section. The method returns a count of the number of multiples of a particular value in the binary tree. Given a number n, a value m is considered a multiple of n if it can be expressed as (k * n) for some integer k. For example, suppose that an IntTree variable tree stores a reference to the following tree:</p>
<p>The table below shows various calls and the values they should return:</p>
<table >
    <thead>
      <th>Call</th>
      <th>Value Returned</th>
      <th>Reason</th>
    </thead>
	<tbody>
		<tr>
			<td>tree.countMultiples(2);</td>
			<td>6</td>
			<td>six multiples of 2 : 6, 2, 8, 6, 4, 0</td>
		</tr>
		<tr>
			<td>tree.countMultiples(4);</td>
			<td>3</td>
			<td>three multiples of 4 : 8, 4, 0</td>
		</tr>
		<tr>
			<td>tree.countMultiples(3);</td>
			<td>5</td>
			<td>five multiples of 3 : 6, 3, 6, 9, 0</td>
		</tr>
		<tr>
			<td>tree.countMultiples(1);</td>
			<td>10</td>
			<td>all ten values are multiples of 1</td>
		</tr>
	</tbody>
</table>
<p>Your method should throw an <code>IllegalArgumentException</code> if passed the value 0.</p>
<p>You may define private helper methods to solve this problem, but otherwise you may not call any other methods of the class nor create any data structures such as arrays, lists, etc. Your method should not change the structure or contents of the tree.</p>
<p>Assume that you are adding this method to the IntTree class as defined below:</p>
<!-- HTML generated using hilite.me --><div style="background: #272822; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #66d9ef">public</span> <span style="color: #66d9ef">class</span> <span style="color: #a6e22e">IntTree</span> <span style="color: #f92672">{</span>
    <span style="color: #66d9ef">private</span> <span style="color: #f8f8f2">IntTreeNode</span> <span style="color: #f8f8f2">overallRoot</span><span style="color: #f92672">;</span>
    <span style="color: #f92672">...</span>
<span style="color: #f92672">}</span>
</pre></div>`
  }
}

router.get('/', async (req, res) => {
    return res.status(200).json(directoryData)
});

router.get('/:id', (req, res) => {
    const prompt = directoryData.idToPrompt[req.params.id];
    return prompt ? res.status(200).send(prompt) : res.status(204).end();
});

export default router;
