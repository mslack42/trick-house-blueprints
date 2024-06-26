'use client'

import { Fragment } from 'react'
import { ObjectTile } from '../../mapspace/objects/ObjectTile'
import { TerrainTile } from '../../mapspace/terrain/TerrainTile'
import { GridDefinition, ObjectDefinition } from '../../mapspace/types'
import { useDesignerCursor } from '../context/cursor/DesignerCursorContext'
import { useDesigner } from '../context/DesignerContext'
import { EditDropdown } from './EditDropdown'

export const Layer = ({ layer }: { layer: GridDefinition }) => {
  const { mapDefinition } = useDesigner()
  const { cursorMode, setCursorTile } = useDesignerCursor()

  const objects: (ObjectDefinition | null)[][] = layer.grid.map(r =>
    r.map(c => null),
  )
  mapDefinition.objects
    .filter(ob => ob.position[2] === layer.gridId)
    .forEach(ob => {
      objects[ob.position[1]][ob.position[0]] = ob
    })

  return (
    <div className='bg-white'>
      <div className='flex w-full flex-row  justify-between space-x-2'>
        <div className='text-nowrap'>{layer.gridId}</div>
        <EditDropdown layer={layer} />
      </div>
      <div className='relative' onPointerLeave={() => setCursorTile(null)}>
        <div
          className={
            'flex flex-col ' +
            (cursorMode !== 'Paint' ? ' pointer-events-none' : '')
          }
        >
          {layer.grid.map((r, j) => (
            <div key={j} className='flex flex-row'>
              {r.map((c, k) => (
                <Fragment key={k}>
                  <TerrainTile tileDef={c} position={[k, j, layer.gridId]} />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
        <div
          className={
            'absolute left-0 top-0 ' +
            (cursorMode !== 'Place' && cursorMode !== 'Select'
              ? ' pointer-events-none'
              : '')
          }
        >
          {objects.map((r, j) => (
            <div key={j} className='flex flex-row'>
              {r.map((c, k) => (
                <Fragment key={k}>
                  <ObjectTile
                    objectType={c?.objectType ?? undefined}
                    position={[k, j, layer.gridId]}
                  />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
