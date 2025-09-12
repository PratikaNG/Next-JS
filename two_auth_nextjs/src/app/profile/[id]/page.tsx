// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function UserProfile({params}: any){
  const userId = await params.id
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">User {userId}</h1>
      <hr/>
        </div>
    )
}