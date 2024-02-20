const Heading = ({ title, subtitle, center }) => {
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className={center ? 'text-center' : 'text-start'}>
                <div className='text-2xl font-bold'>{title}</div>
                <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
            </div>

        </div>
    )
}

export default Heading