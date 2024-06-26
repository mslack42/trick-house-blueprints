import { MapDefinition } from '@/components/mapspace/types'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../common/Dialog'
import { useDesigner } from '../context/DesignerContext'
import { useDesignerDialogs } from '../context/dialog/DesignerDialogContext'

export function ImportDialog() {
  const { setOpenDialog, openDialog } = useDesignerDialogs()
  const { setMapDefinition } = useDesigner()

  const [importMap, setImportMap] = useState<string>('')
  const importProvidedMap = () => {
    try {
      const providedMap: MapDefinition = JSON.parse(importMap) as MapDefinition
      setMapDefinition(providedMap)
      setImportMap('')
    } catch (e) {}
  }

  return (
    <Dialog open={openDialog === 'Import'}>
      <DialogContent>
        <DialogHeader>Map Import</DialogHeader>
        <DialogDescription>
          This will wipe the currently loaded map design!!!
        </DialogDescription>
        <textarea
          placeholder='Paste a map export here'
          className='min-h-96'
          defaultValue={importMap}
          onChange={e => setImportMap(e.target.value)}
        ></textarea>
        <DialogFooter>
          <button onClick={() => setOpenDialog(null)}>Close</button>
          <button
            onClick={() => {
              importProvidedMap()
              setOpenDialog(null)
            }}
          >
            Import
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
