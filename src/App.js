import { Routes, Route } from 'react-router-dom';
import elementRouter from './router/router';
import { DefaultLayout } from './layouts';
import './scss/app.scss';
import 'rsuite/lib/styles/index.less'
import './custom-theme.less'

function App() {
    return (
  
            <Routes>
                {elementRouter.map((item, index) => {
                    const Page = item.component;
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <DefaultLayout>
                                    <Page />
                                </DefaultLayout>
                            }
                        />
                    );
                })}
              
            </Routes>
 
    );
}

export default App;
