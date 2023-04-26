import { Dashboard, ExitToApp, Groups, Menu, MenuOpen, } from '@mui/icons-material'
import { Box, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import teacher from '../../assets/4205.png'
import { GlobalContext, GlobalContextType } from '../../contexts/global'


export default function Layout(props: any) {
  const { isSidebarExpanded, setIsSidebarExpanded } = useContext(GlobalContext) as GlobalContextType

  const { children } = props
  const navigate = useNavigate()

  const { setLoggedUser }: any = useContext(GlobalContext)

  const handleLogout = async () => {
    setLoggedUser(false)
    navigate('/')
  }


  const menu: any = [
      {
        text: 'Dashboard',
        icon: <Dashboard />,
        path: '/dashboard',
        cy: 'sidebar-dashboard'
      },
      {
        text: 'Alunos',
        icon: <Groups />,
        path: '/student',
        cy: 'sidebar-students'
      },
      
    ]

  const menuItems: any = menu

  return (
    <>
      <Drawer variant="permanent" anchor="left"  >
        <List
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            p: 0,
            margin: 0,
            listStyle: 'none',
            backgroundColor: 'primary.700',
          }}
        >

          <Box sx={{ height: '100%', transition: 'width ease 200ms', width: isSidebarExpanded ? '240px' : '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <ListItem sx={{ height: '4rem', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'primary.light' }}>
              <img hidden={!isSidebarExpanded} style={{ width: '100%', maxWidth: '90px' }} src={teacher} alt="teacher" />
              <Icon sx={{ cursor: 'pointer', color: 'primary.light' }} onClick={() => setIsSidebarExpanded((state: any) => !state)}>
                {isSidebarExpanded ? <MenuOpen /> : <Menu />}
              </Icon>
            </ListItem>

            <Box sx={{
              flex: 1,
              overflowY: 'auto'
            }}>
              {menuItems?.map((item: any, index: number) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => navigate(item.path)}
                  sx={{
                    p: 2, borderBottom: '1px solid', borderColor: 'primary.light', gap: 2, height: '3.5rem', display: item?.hidden ? "none" : "auto"
                  }}
                  data-cy={item.cy}
                >
                  <Tooltip title={isSidebarExpanded ? '' : item.text} placement="right" arrow>
                    <ListItemIcon sx={{ minWidth: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'primary.contrastText' }}>{item.icon}</ListItemIcon>
                  </Tooltip>
                  <ListItemText primary={item.text} hidden={!isSidebarExpanded} sx={{ fontSize: '0.8125rem', fontWeight: 400, color: 'primary.contrastText' }} />
                </ListItem>
              ))}
            </Box>

            <ListItem
              button
              data-cy="sidebar-logout"
              sx={{ p: 2, gap: 2, height: '4rem' }}
              onClick={handleLogout}
            >
              <ListItemText sx={{ color: 'primary.contrastText' }} hidden={!isSidebarExpanded} primary="Sair da conta" />
              <ListItemIcon sx={{ minWidth: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'primary.contrastText' }}><ExitToApp /></ListItemIcon>
            </ListItem>
          </Box>

        </List>

      </Drawer>

      <Box sx={{ pl: isSidebarExpanded ? '240px ' : '60px' }}>
        {children}
      </Box>
    </>

  )
}