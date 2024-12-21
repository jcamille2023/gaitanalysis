export function Link({children, href}: {children: string, href: string}) {
    return (
        <button className='button' onClick={() => window.location.href = href}>
            {children}
        </button>
    )

}

export function Button({children, onclick}: {children: string, onclick: () => void}) {
    return (
        <button className='button' onClick={onclick}>
            {children}
        </button>
    );
}
