import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { getRandomInterviewCover } from '@/lib/utils'
import { Button } from './ui/button'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'

const InterviewCard = ({id, userId, role, type, techstack, createdAt} : InterviewCardProps) => {
    //For giving feedback
    const feedback = null as Feedback | null
    //For specifying the type of Interview: behavioral or technical or mixed
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')
    
    return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
        <div className='card-interview'>
            <div>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                  <p className='badge-text'>{normalizedType}</p>  
                </div>
                <Image 
                  src={getRandomInterviewCover()} 
                  alt="cover Image" 
                  width={90} 
                  height={90} 
                  className="rounded-full-object-fitsize-[90px]" 
                />

                <h3 className='mt-5 capitalize'>
                    {role} Interview
                </h3>
                
                {/* Date and Rating Row */}
                <div className='flex flex-row gap-5 mt-3'>
                    <div className='flex flex-row gap-2'>
                        <Image src="/calendar.svg" alt="Calendar" width={22} height={22} />
                        <p>{formattedDate}</p>
                    </div>
                    
                    <div className='flex flex-row gap-2'>
                        <Image src="/star.svg" alt="star" width={22} height={22} />
                        <p>{feedback?.totalScore || '---'}/100</p>
                    </div>
                </div>
                
                {/* Description - Now moved below date and rating */}
                <p className='line-clamp-2 mt-5'>
                    {feedback?.finalAssessment || "You haven't taken the interview yet, Take it Now to Improve your skills"}
                </p>
                
                <div className='flex flex-row justify-between mt-5'>
                    <DisplayTechIcons techstack={techstack} />
                    <Button className='btn-primary'>
                        <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`} className='flex flex-row gap-2'>
                            {feedback ? 'Check Feedback' : 'View Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InterviewCard