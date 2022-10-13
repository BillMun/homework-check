import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack} from 'victory'

function SingleStudent (){
    const params = useParams()
    const classroom = useSelector(state=>state.classrooms).classrooms
    .filter(classroom => classroom.id==params.classroomId)[0]
    const student = classroom ? classroom.students.filter(student => student.id==params.studentId)[0]:null
    const countTrue = classroom ? student.studentAssignments.reduce((acc,elem)=>{
        if(elem.completed) return acc+=1
        else return acc},0):null
    const data = classroom ? [{x:'complete', total:countTrue},{x:'missing', total:student.studentAssignments.length-countTrue}]:null
    const ticks = classroom ? student.studentAssignments.map((elem,index)=>index+1):null

    return (
        <div>
            {classroom ?
            <div className='outerContainer'>
            <div className='singleStudentContainer'>
                <div className='contentContainer'>
                    <h1>{student.name}</h1>
                    {student.studentAssignments.map(assignment=>
                    <div key={assignment.id}>
                    <h4>{assignment.assignment.name} is {assignment.completed ? 'complete':'missing'}</h4>
                    </div>)}
                </div>
                    {/* <svg>
                        <defs>
                          <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%"   stopColor="green"/>
                            <stop offset="100%" stopColor="red"/>
                           </linearGradient>
                        </defs>
                    </svg>         */}
                <div className='charts'>
                    <VictoryChart
                    responsive = {false}
                    animate ={{
                        duration: 2000,
                        onLoad: {delay:0,duration:1},
                        easing:'expInOut'
                    }}
                    domainPadding={50}
                    theme = {VictoryTheme.material}
                    >   
                        <VictoryAxis
                        tickValues={[1,2]}
                        tickFormat={['Completed', 'Missing']}
                        />
                        <VictoryAxis
                        dependentAxis
                        tickValues={ticks.length < 8 ? ticks : null}
                        tickFormat={(x)=>Math.floor(x)}
                        />
                        <VictoryBar
                        style={{
                            data:{
                                fill: ({datum})=> datum.x === 'complete' ? 'green' : 'red'}
                        }}
                        barWidth={30}
                        data={data}
                        x='x'
                        y='total'/>
                    </VictoryChart>
                </div>
            </div>
            </div>
            :null}
        </div>
    )
}

export default SingleStudent