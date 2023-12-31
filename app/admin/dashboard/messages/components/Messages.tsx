"use client"
import React,{useEffect,useState,useRef} from 'react'
import { useLanguageContext } from "@/context/language-context"
import getCurrentUser from '@/app/actions/getCurrentUser'
import Link from 'next/link'
import { fetchMessages } from '@/utils'
import moment from 'moment';
import Loading from '@/app/loading'

interface Message {
    id: string;
    body: string;
    createdAt: string; 
    sender: {
      email: string;
      image: string;
      name?: string; 
    };
   }

function Messages() {

    const {currentUser,setCurrentUser,setIsAdminPage} = useLanguageContext()
    const [allMessages,setAllMessages] = useState<Message[]>([])
    const [displayCount, setDisplayCount] = useState(4); // Initially display 5 users
    const lastUserRef = useRef<HTMLDivElement | null>(null);
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
      setIsAdminPage(true)
        const fetchCurrentUser = async() => {
          try {
            const currentUser = await getCurrentUser();
            setCurrentUser(currentUser)
          } catch (error) {
            console.error('Error fetching current user:', error);
          }
        };
    
        fetchCurrentUser();
      }, []);

      useEffect(() => {
         const fetchFunction = async () => {
            const response = await fetchMessages()
            setAllMessages(response)
            setIsLoading(false)

        }
        fetchFunction()
    },[]) 

    const loadMoreMessages = () => {
        setDisplayCount(displayCount + 4); // Increase the displayed count by 5
      };
  
      const scrollToTop = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
        };
  
      useEffect(() => {
          if (lastUserRef.current) {
            lastUserRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, [displayCount]);

        const allMessagesI = [
            {
              id: "1",
              body: "Message 1",
              createdAt: "2023-01-01T08:00:00Z",
              sender: {
                email: "sender1@example.com",
                image: 'https://randomuser.me/api/portraits/women/9.jpg',
                name: "Sender 1",
              },
            },
            {
              id: "2",
              body: "Message 2",
              createdAt: "2023-01-02T10:30:00Z",
              sender: {
                email: "sender2@example.com",
                image: 'https://randomuser.me/api/portraits/women/7.jpg',
                name: "Sender 2",
              },
            },
            {
              id: "3",
              body: "Message 3",
              createdAt: "2023-01-03T12:45:00Z",
              sender: {
                email: "sender3@example.com",
                image: 'https://randomuser.me/api/portraits/men/6.jpg',
                name: "Sender 3",
              },
            },
            {
              id: "4",
              body: "Message 4",
              createdAt: "2023-01-04T14:20:00Z",
              sender: {
                email: "sender4@example.com",
                image: 'https://randomuser.me/api/portraits/women/5.jpg',
                name: "Sender 4",
              },
            },
            {
                id: "5",
                body: "Message 5",
                createdAt: "2023-01-05T09:30:00Z",
                sender: {
                  email: "sender5@example.com",
                  image: 'https://randomuser.me/api/portraits/men/4.jpg',
                  name: "Sender 5",
                },
              },
              {
                id: "6",
                body: "Message 6",
                createdAt: "2023-01-06T11:15:00Z",
                sender: {
                  email: "sender6@example.com",
                  image: 'https://randomuser.me/api/portraits/women/3.jpg',
                  name: "Sender 6",
                },
              },
              {
                id: "7",
                body: "Message 7",
                createdAt: "2023-01-07T13:40:00Z",
                sender: {
                  email: "sender7@example.com",
                  image: 'https://randomuser.me/api/portraits/women/2.jpg',
                  name: "Sender 7",
                },
              },
            {
              id: "15",
              body: "Message 15",
              createdAt: "2023-01-15T18:20:00Z",
              sender: {
                email: "sender15@example.com",
                image: 'https://randomuser.me/api/portraits/men/1.jpg', 
                name: "Sender 15",
              },
            },
          ];
          
       
          
  return (
    <section>

    {currentUser?.admin ? (

    <div className='w-full h-full flex flex-col items-center mt-28'>Messages
     <div className='mb-4 hover:bg-gray-100 darl dark:text-black text-xl border px-4 bg-gray-300  border-emerald-300 rounded-lg'>
          <Link href={'/admin/dashboard/'}
              scroll={false}
            >
              Go back to dashboard
            </Link>
        </div>
        {!isLoading ? <>

        <div className='mb-8'>
             <h1>You have received  {allMessages.length} messages</h1>
      </div>
      <div className='flex flex-col  gap-4 md:w-[60%]'>
      {allMessages.slice(0, displayCount).map((message, index) => {
  const isLastMessage = index === displayCount - 1;
  return (
<Link href={`/admin/dashboard/messages/${message.id}`}   key={index}>
<div

  ref={isLastMessage ? lastUserRef : null}
  className='dark:bg-gray-800 mx-2 px-2 pt-2 border border-gray-300 rounded grid  gap-4 relative hover:bg-gray-200 dark:hover:bg-gray-600 p-4 rounded-md'
>
  {/* First Row */}
  <div className='col-span-1 '>
    <p className='font-bold'>{moment(message.createdAt).format('DD.MM YYYY HH:mm')}</p>
  </div>
  <div className='col-span-1 '>
    <p>{message.sender.email}</p>
  </div>
  <div className='col-span-1 w-10 flex justify-center items-center  '>
    <img src={message.sender.image} alt={`Profile of ${message.sender.name}`} className='rounded-full w-10 h-10' />
  </div>
{/*   <div className='absolute text-2xl top-2 right-2'>
    <FaRegTrashAlt />
  </div> */}
  <div className='absolute bottom-2 right-2'>
    <h1 className='text-red-700 dark:text-red-500 font-bold'>New </h1>
  </div>

  {/* Second Row */}
  <div className='col-span-3'>
    <p className='font-bold'>{message.body}</p>
  </div>
</div>
</Link>
  
  );
})}

      {displayCount < allMessagesI.length && allMessages.length > 4 && (
        <button onClick={loadMoreMessages} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Load More 4 Messages
        </button>
      )}
      {displayCount > 4 && (
        <button onClick={scrollToTop} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
          Go Up
        </button>
      )}
    </div>


    </>  : <Loading/>}

    </div>

    ):(
        <div className='w-screen h-screen flex items-center justify-center'>
            YOU ARE NOT AUTHORIZED TO SEE THIS PAGE
    </div>
    )}

    </section>
  )
}

export default Messages