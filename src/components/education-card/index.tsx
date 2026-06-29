import { SanitizedEducation } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import TimelineItem from '../timeline-item';

const EducationCard = ({
  loading,
  educations,
}: {
  loading: boolean;
  educations: SanitizedEducation[];
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <TimelineItem
          key={index}
          time={skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}
          title={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          subtitle={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
      );
    }

    return array;
  };

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">Education</span>
            )}
          </h5>
        </div>
        <div className="text-base-content">
          <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
            {loading ? (
              renderSkeleton()
            ) : (
              <>
                {educations.map((item, index) => (
                  <TimelineItem
                    key={index}
                    time={`${item.from} - ${item.to}`}
                    title={item.degree}
                    subtitle={item.institution}
                  />
                ))}
              </>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
