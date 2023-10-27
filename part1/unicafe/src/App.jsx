import { useState } from "react"

export const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positiveRatio, setPositiveRatio] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setAverage(((good + 1) - bad) / (total + 1))
    setPositiveRatio((good + 1) / (total + 1) * 100)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setAverage((good - bad) / (total + 1))
    setPositiveRatio((good) / (total + 1) * 100)
  }
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setAverage((good - (bad + 1)) / (total + 1))
    setPositiveRatio((good) / (total + 1) * 100)
  }

  const statistics = {
    good: {
      text: "good",
      value: good
    }, 
    neutral: {
      text: "neutral",
      value: neutral
    },
    bad: {
      text: "bad",
      value: bad
    },
    total: {
      text: "total",
      value: total
    },
    average: {
      text: "average",
      value: average
    },
    positiveRatio: {
      text: "positive",
      value: positiveRatio
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button text="good" onClick={handleGoodClick}/>
      <Button text="neutral" onClick={handleNeutralClick}/>
      <Button text="bad" onClick={handleBadClick}/>
      <br />
      <h1>statistics</h1>
      <br />
      <Statistics statistics={statistics}/>
    </div>
  )
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistics = ({statistics}) => {
  const mainStatistics = [statistics.good.value, statistics.neutral.value, statistics.bad.value]
  if(mainStatistics.every(stat => stat === 0)) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text={statistics.good.text} value={statistics.good.value} />
        </tr>
        <tr>
          <StatisticLine text={statistics.neutral.text} value={statistics.neutral.value} />
        </tr>
        <tr>
          <StatisticLine text={statistics.bad.text} value={statistics.bad.value} />
        </tr>
        <tr>
          <StatisticLine text={statistics.total.text} value={statistics.total.value} />
        </tr>
        <tr>
          <StatisticLine text={statistics.average.text} value={statistics.average.value} />
        </tr>
        <tr>
          <StatisticLine text={statistics.positiveRatio.text} value={statistics.positiveRatio.value} />
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => <><td>{text}</td><td>{value}{text === "positive" && "%"}</td></>