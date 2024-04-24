import React from 'react'

function BikePageComponent({id}) {
  return (
    <div className='text-white'>
      <h1>Hola mundo desde BikePageComponent</h1>
      {console.log(id)}
    </div>
  )
}

export default BikePageComponent
