import style from './Layout.module.css';

type LayoutProps = {
    topBar: React.ReactNode,
    bottomBar: React.ReactNode,
    sideBar: React.ReactNode,
    children: React.ReactNode
}

function Layout({ topBar, bottomBar, sideBar, children }: LayoutProps) {

    return (
        <div className={[style.container, 'monautreclasse1', 'monautreclasse2'].join(' ')}>
            <div className={`${style.topBar} monAutreClasse1`}>{ topBar }</div>
            <div className={style.sideBar}>{ sideBar }</div>
            <div className={style.content}>{ children }</div>
            <div className={style.bottomBar}>{ bottomBar }</div>
        </div>
    )
}

export { 
    Layout
}