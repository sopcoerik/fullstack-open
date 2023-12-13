const calculateBmi = () => {
  if(process.argv.length < 3 || process.argv.length < 4) {
    console.error('no height or mass provided')
    return
  }

  const height:number = Number(process.argv[2]) / 100
  const mass:number = Number(process.argv[3])

  if(isNaN(height) || isNaN(mass)) {
    console.error('invalid data type provided (height: number, mass: number)')
    return
  }

  const bmi:number = +(mass / Math.pow(Number(height.toFixed(2)), 2)).toFixed(2)

  if(bmi < 18.5){ 
    console.log(`Underweight (${bmi})`)
    return
  } else if(bmi >= 18.5 && bmi < 25) {
    console.log(`Normal weight (${bmi})`)
    return
  } else if(bmi >= 25 && bmi < 30) {
    console.log(`Overweight (${bmi})`)
    return
  } else if(bmi >= 30) {
    console.log(`Obese (${bmi})`)
  }

  return bmi
}

calculateBmi()