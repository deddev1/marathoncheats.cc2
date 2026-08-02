import { Navigate, useParams } from 'react-router-dom';
import { getSiteVideo } from '../content/videos';
import { NotFoundPage } from './NotFound';

/** Legacy /videos/:slug URLs redirect to the page where the clip is embedded. */
export function VideoPage() {
  const { slug = '' } = useParams();
  const video = getSiteVideo(slug);

  if (!video) {
    return <NotFoundPage />;
  }

  return <Navigate to={video.embedPath} replace />;
}
