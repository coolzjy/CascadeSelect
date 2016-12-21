(function(){
  function rd (min, max) {
    return min + parseInt(Math.random() * (max - min))
  }

  function getStruct (count) {
    return Array.from(Array(count)).map((x, i) => `level-${i}`)
  }

  function rdstr (max) {
    return String.fromCharCode.apply(String, Array.from(Array(5)).map(() => rd(65, 127)))
  }

  function getGroupName () {
    return `[GROUP] ${rdstr(10)}`
  }

  function getDataArr () {
    return Array.from(Array(rd(3, 8))).map(() => {
      const i = rdstr(8)
      return {
        n: `[name] ${i}`,
        i
      }
    })
  }

  const GROUP_COUNT = rd(2, 5)

  const data = Array.from(Array(GROUP_COUNT)).map(() => {
    return {
      name: getGroupName(),
      data: {},
      struct: getStruct(rd(2, 6))
    }
  })

  data.forEach(d => {
    let level = 0
    d.data[level++] = { '0': getDataArr() }
    while(level < d.struct.length) {
      d.data[level] = {}
      Object.keys(d.data[level - 1]).forEach(k => {
        d.data[level - 1][k].forEach(p => {
          d.data[level][p.i] = getDataArr()
        })
      })
      level++
    }
  })

  if (typeof module === 'undefined') {
    window.seed = data
  }
  console.log(data)

})()
